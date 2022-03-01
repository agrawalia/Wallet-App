import TransactionRoutes from "../routes/transaction";
import Transaction from "../models/transaction";
import Post from "../models/user";

import mailgun from "mailgun-js";
import "dotenv/config";
const mg = mailgun({ apiKey: process.env.API_KEY, domain: process.env.DOMAIN });

/* Manage Transfer Functionality between Users */
exports.transferAmount = async (req, res, next) => {
  try {
    const from = req.body.from;
    const to = req.body.to;
    const amount = req.body.amount;

    const sender = await Post.findOne({ email: from });
    const receiver = await Post.findOne({ email: to });

    if (sender.balance < amount) {
      res.json({ message: "Not sufficient balance" });
    } else {
      sender.balance = sender.balance - amount;
      const insertRecordSender = await sender.save();

      receiver.balance = receiver.balance + amount;
      const insertRecordReceiver = await receiver.save();

      const insertTransaction = new Transaction(req.body);
      const insertRecordTransaction = await insertTransaction.save();

      const txndate = insertRecordTransaction.txndate;

      /* Send Transaction Success/Failure Details to User on Email */
      const data = {
        from: "noreply@ishan.com",
        to: from,
        subject: "Account Update",
        html: `<h2> Rs. ${amount} has been debited towards ${to} on ${txndate} </h2>`,
      };
      mg.messages().send(data, function (error, body) {
        if (error) {
          return res.json({
            error: error.message,
          });
        }
        return res.json({
          message: "Amount transferred successfully",
        });
      });
    }
  } catch (exe) {
    res.send("Transfer failed");

    const data = {
      from: "noreply@ishan.com",
      to: from,
      subject: "Account Update",
      html: `<h2> Your transaction is failed. Please try after some time. </h2>`,
    };
    mg.messages().send(data, function (error, body) {
      if (error) {
        return res.json({
          error: error.message,
        });
      }
      return res.json({
        message: "Transaction failed",
      });
    });
  }
};

/* Show Transaction Details */
exports.getTransactionDetails = async (req, res, next) => {
  try {
    const insertTransaction = await Transaction.find({});
    res.status(200).send(insertTransaction);
  } catch (exe) {
    res.status(400).send(exe);
  }
};
