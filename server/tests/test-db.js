"use strict";
// tests/test-db.ts
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
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./.env.test" });
const pool = new pg_1.Pool({
    user: process.env.DB_USER || "your_username",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "your_database",
    password: process.env.DB_PASSWORD || "your_password",
    port: Number(process.env.DB_PORT) || 5432,
});
function testConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield pool.query("SELECT NOW();");
            console.log("PostgreSQL Connected! Time:", res.rows[0].now);
        }
        catch (err) {
            console.error("Database connection error:", err);
        }
        finally {
            pool.end();
        }
    });
}
testConnection();
