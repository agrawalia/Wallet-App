import TransactionRoutes from "../routes/transaction";
import Transaction from "../models/transaction";
import Post from "../models/user";
import { transferAmount, getTransactionDetails } from "../services/transaction";

/* Manage Transfer Functionality between Users */
exports.transferAmount = async (req, res, next) => {
  try {
    const transaction = await transferAmount();
    res.status(200).json({
      message: "Transferred",
    });
  } catch (exe) {
    res.status(200).json({
      message: "Transferred fail",
    });
  }
};

/* Show Transaction Details */
exports.getTransactionDetails = async (req, res, next) => {
  try {
    const insertTransaction = await getTransactionDetails();
    res.status(200).json({
      message: insertTransaction,
    });
  } catch (exe) {
    res.status(400).send(exe);
  }
};
