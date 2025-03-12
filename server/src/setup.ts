import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || "your_username",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "your_database",
  password: process.env.DB_PASSWORD || "your_password",
  port: Number(process.env.DB_PORT) || 5432,
});

export async function setupDatabase() {
  // Create tables, insert data, etc.
  await pool.query(`
    CREATE TABLE IF NOT EXISTS recipes (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      cook_time INT,
      ingredients TEXT[]
    );
  `);

  await pool.query(`
    INSERT INTO recipes (name, cook_time, ingredients)
    VALUES
      ('Spaghetti', 30, '{"spaghetti", "tomato sauce", "cheese"}'),
      ('Salad', 15, '{"lettuce", "tomato", "cucumber"}')
    ON CONFLICT (name) DO NOTHING;
  `);
}