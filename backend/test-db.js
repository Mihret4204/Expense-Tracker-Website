import pool from "./src/config/db.js";

async function testDB() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database connected successfully");
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error("❌ Database connection failed");
    console.error(error.message);
    process.exit(1);
  }
}

testDB();
