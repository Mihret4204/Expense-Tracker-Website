import express from "express";
import authMiddleware from "../middleware/auth.js";



import {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction
} from "../controller/transaction.js";

const router = express.Router();

// Create transaction
router.post("/",authMiddleware, addTransaction);

// Get all transactions for a user
// router.get("/",authMiddleware, getTransactions);
router.get("/:user_id",authMiddleware, getTransactions);

// Update transaction
router.put("/:id",authMiddleware, updateTransaction);

// Delete transaction
router.delete("/:id",authMiddleware, deleteTransaction);

export default router;
