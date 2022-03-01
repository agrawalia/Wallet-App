import express from "express";
import TransactionController from "../controllers/transaction";
const router = express.Router();

// /transaction/transfer{body : from,to,amount}
router.post("/transfer", TransactionController.transferAmount);

// /transaction/transactionDetails
router.get("/transactionDetails", TransactionController.getTransactionDetails);
module.exports = router;
