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
  // let exists = await pool.query(`SELECT to_regclass('public.recipes') as exists`);
  // console.log(exists.rows[0].exists === "recipes");
  const query = `
  SELECT table_name
  FROM information_schema.tables
  WHERE table_schema = 'public'
    AND table_name IN ('weather_data', 'cities', 'weather_conditions');
`;

  const result = await pool.query(query);
  console.log(result)
  // Drop all tables to start clean on start
  await pool.query(`DROP TABLE IF EXISTS weather_data CASCADE;`);
  await pool.query(`DROP TABLE IF EXISTS weather_conditions CASCADE;`);
  await pool.query(`DROP TABLE IF EXISTS cities CASCADE;`);
  await pool.query(`DROP TABLE IF EXISTS recipes CASCADE;`);

  // Create tables, insert data, etc.
  await pool.query(`
    CREATE TABLE IF NOT EXISTS recipes (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      cook_time INT,
      ingredients TEXT[]
    );
  `);

  // Cities table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS cities (
      id INT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      country_code CHAR(2) NOT NULL,
      latitude DECIMAL(9,6) NOT NULL,
      longitude DECIMAL(9,6) NOT NULL,
      UNIQUE (name, country_code)
    );
  `);

  // Weather conditions table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS weather_conditions(
      id INT PRIMARY KEY,
      description VARCHAR(255) NOT NULL,
      icon VARCHAR(10) NOT NULL
    );
  `);

  // Weather data table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS weather_data (
      id SERIAL PRIMARY KEY,
      city_id INT REFERENCES cities(id) ON DELETE CASCADE,
      recorded_at BIGINT NOT NULL,
      temperature DECIMAL(5,2) NOT NULL,
      feels_like DECIMAL(5,2) NOT NULL,
      wind_speed DECIMAL(5,2) NOT NULL,
      condition_id INT REFERENCES weather_conditions(id) ON DELETE SET NULL
    );
  `);

  // Insert values into recipes
  await pool.query(`
    INSERT INTO recipes (name, cook_time, ingredients)
    VALUES
      ('Spaghetti', 30, '{"spaghetti", "tomato sauce", "cheese"}'),
      ('Salad', 15, '{"lettuce", "tomato", "cucumber"}')
    ;
  `);
}