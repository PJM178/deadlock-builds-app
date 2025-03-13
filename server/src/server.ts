import express, { Request, Response } from "express";
import { Pool } from "pg";
import cors from "cors";
import dotenv from "dotenv";
import { setupDatabase } from "./setup";

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

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
