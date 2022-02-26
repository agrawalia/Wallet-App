const TransactionRoutes = require("../routes/transaction");
const Transaction = require("../models/transaction");
const Post = require("../models/signup");

exports.transferAmount = async (req, res, next) => {
  try {
    const from = req.body.from;
    const to = req.body.to;
    const amount = req.body.amount;
    console.log(from);
    //res.send("ok");

    const sender = await Post.findOne({ email: from });
    const receiver = await Post.findOne({ email: to });
    console.log(sender.balance);
    console.log(amount);
    if (sender.balance < amount) {
      res.json({ message: "Not sufficient balance" });
      console.log("Not sufficient balance");
    } else {
      sender.balance = sender.balance - amount;
      console.log(sender.balance);
      const insertRecordSender = await sender.save();

      receiver.balance = receiver.balance + amount;
      console.log(receiver.balance);
      const insertRecordReceiver = await receiver.save();

      const insertTransaction = new Transaction(req.body);
      const insertRecordTransaction = await insertTransaction.save();

      res.send("Amount transferred successfully");
    }
  } catch (exe) {
    console.log("Transfer failed");
    res.send("Transfer failed");
  }
};

exports.getTransactionDetails = async (req, res, next) => {
  try {
    const insertTransaction = await Transaction.find({});
    res.status(200).send(insertTransaction);
  } catch (exe) {
    res.status(400).send(exe);
  }
};
