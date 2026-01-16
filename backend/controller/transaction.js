import pool from "../src/config/db.js";

/**
 * ADD TRANSACTION
 */
export async function addTransaction(req, res) {
  try {
    const {
      user_id,
      type,
      amount,
      currency,
      category,
      description,
      transaction_date,
      transaction_time
    } = req.body;

    if (
      !user_id ||
      !type ||
      !amount ||
      !currency ||
      !category ||
      !transaction_date ||
      !transaction_time
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await pool.query(
      `INSERT INTO transactions 
      (user_id, type, amount, currency, category, description, transaction_date, transaction_time)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        type,
        amount,
        currency,
        category,
        description || null,
        transaction_date,
        transaction_time
      ]
    );

    return res.status(201).json({ message: "Transaction added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

/**
 * GET USER TRANSACTIONS
 */
export async function getTransactions(req, res) {
  try {
    const { user_id } = req.params;

    const [rows] = await pool.query(
      `SELECT * FROM transactions 
       WHERE user_id = ? 
       ORDER BY transaction_date DESC, transaction_time DESC`,
      [user_id]
    );

    return res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

/**
 * DELETE TRANSACTION
 */
export async function deleteTransaction(req, res) {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM transactions WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res.status(200).json({ message: "Transaction deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}
/**
 * UPDATE TRANSACTION
 */
export async function updateTransaction(req, res) {
  try {
    const { id } = req.params;
    const {
      type,
      amount,
      currency,
      category,
      description,
      transaction_date,
      transaction_time
    } = req.body;

    if (
      !type ||
      !amount ||
      !currency ||
      !category ||
      !transaction_date ||
      !transaction_time
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const [result] = await pool.query(
      `UPDATE transactions SET
        type = ?,
        amount = ?,
        currency = ?,
        category = ?,
        description = ?,
        transaction_date = ?,
        transaction_time = ?
       WHERE id = ?`,
      [
        type,
        amount,
        currency,
        category,
        description || null,
        transaction_date,
        transaction_time,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res.status(200).json({ message: "Transaction updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}
