import mongoose from "mongoose";
import "dotenv/config";

const transactionSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  txndate: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
