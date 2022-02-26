const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/transaction");

// /api/transfer{body : from,to,amount}
router.post("/transfer", TransactionController.transferAmount);

// /api/transactionDetails
router.get("/transactionDetails", TransactionController.getTransactionDetails);
module.exports = router;
