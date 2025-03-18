import express, { Request, Response } from "express";
import { Pool } from "pg";
import cors from "cors";
import dotenv from "dotenv";
import { setupDatabase } from "./setup";
import { Cities, WeatherConditions, WeatherData } from "./types/weather";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER || "your_username",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "your_database",
  password: process.env.DB_PASSWORD || "your_password",
  port: Number(process.env.DB_PORT) || 5432,
});

// setupDatabase().then(() => console.log("Database setup complete!"));

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("PostgreSQL API is running...");
});

// Fetch data from PostgreSQL
app.get("/recipes", async (req: Request, res: Response) => {
  console.log(process.env.DB_USER)
  try {
    console.log("Request received");

    req.on("aborted", () => {
      console.log("Request was aborted by the client");
    });
    // Simulate network delay
    await new Promise<void>((res) => {
      setTimeout(() => {
        res();
      }, 2000);
    });
    const result = await pool.query("SELECT * FROM recipes");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).send("Server Error");
  }
});

app.post("/api/weather", async (req: Request, res: Response) => {
  const { cityData, weatherConditionData, weatherData }: { cityData: Cities, weatherConditionData: WeatherConditions, weatherData: WeatherData } = req.body;

  const client = await pool.connect();

  try {
    // Start the transaction
    await client.query("BEGIN");

    // Step 1: Insert city data if it does not exist (using ON CONFLICT)
    const insertCityQuery = `
      INSERT INTO cities (id, name, country_code, latitude, longitude)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (id) DO NOTHING;
    `;

    const cityValues = [cityData.id, cityData.name, cityData.country_code, cityData.latitude, cityData.longitude];
    await client.query(insertCityQuery, cityValues);

    // Step 2: Insert weather condition data if it does not exist (using ON CONFLICT)
    const insertWeatherConditionQuery = `
      INSERT INTO weather_conditions (id, description, icon)
      VALUES ($1, $2, $3)
      ON CONFLICT (id) DO NOTHING;
    `;

    const weatherConditionValues = [weatherConditionData.id, weatherConditionData.description, weatherConditionData.icon];
    await client.query(insertWeatherConditionQuery, weatherConditionValues);

    // Step 3: Insert weather data
    const insertWeatherDataQuery = `
      INSERT INTO weather_data (city_id, recorded_at, temperature, feels_like, wind_speed, condition_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;

    const weatherDataValues = [weatherData.city_id, weatherData.recorded_at, weatherData.temperature, weatherData.feels_like, weatherData.wind_speed, weatherData.condition_id];
    const result = await client.query(insertWeatherDataQuery, weatherDataValues);

    // Commit the transaction if all queries succeed
    await client.query("COMMIT");

    // Respond with the ID of the newly inserted weather data
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    // Rollback the transaction if any query fails
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ error: "Failed to insert data" });
  } finally {
    client.release(); // Release the client back to the pool
  }
});

app.get("/api/weather", async (req: Request, res: Response) => {
  try {
    const query = `
      SELECT
        wd.id,
        wd.recorded_at,
        wd.temperature,
        wd.feels_like,
        wd.wind_speed,
        c.name AS city_name,
        wc.description AS condition_description,
        wc.icon AS condition_icon
      FROM weather_data wd
      JOIN cities c ON wd.city_id = c.id
      JOIN weather_conditions wc ON wd.condition_id = wc.id;
    `;

    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching weather data:", error);

    res.status(500).send("Server Error");
  }
});

async function startServer() {
  try {
    await setupDatabase();
    console.log("Database setup complete.")

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error setting up the database:", err);
    process.exit(1); // Exit if setup fails
  }
};

startServer();