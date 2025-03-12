// tests/test-db.ts

import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.test" });

const pool = new Pool({
  user: process.env.DB_USER || "your_username",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "your_database",
  password: process.env.DB_PASSWORD || "your_password",
  port: Number(process.env.DB_PORT) || 5432,
});

async function testConnection() {
  try {
    const res = await pool.query("SELECT NOW();");
    console.log("PostgreSQL Connected! Time:", res.rows[0].now);
  } catch (err) {
    console.error("Database connection error:", err);
  } finally {
    pool.end();
  }
}

testConnection();