"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// PostgreSQL connection
const pool = new pg_1.Pool({
    user: process.env.DB_USER || "your_username",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "your_database",
    password: process.env.DB_PASSWORD || "your_password",
    port: Number(process.env.DB_PORT) || 5432,
});
// Test route
app.get("/", (req, res) => {
    res.send("PostgreSQL API is running...");
});
// Fetch data from PostgreSQL
app.get("/recipes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query("SELECT * FROM recipes");
        res.json(result.rows);
    }
    catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).send("Server Error");
    }
}));
// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
