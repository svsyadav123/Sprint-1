import "./config/env.js";
import cors from "cors";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import pool from "./database/mysql.js";
import aiRoutes from "./routes/aiRoutes.js";
import { connectMongo } from "./database/mongo.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();
const port = process.env.PORT || 5000;
const allowedOrigins = new Set([process.env.CLIENT_URL || "http://localhost:5173"]);

app.use(cors({ origin: (origin, callback) => callback(null, !origin || allowedOrigins.has(origin) || /^http:\/\/localhost:\d+$/.test(origin)) }));
app.use(express.json({ limit: "6mb" }));
app.get("/api/health", (request, response) => response.json({ success: true, message: "ZeroMind API is running" }));
app.use("/api/auth", authRoutes);
app.use("/api/ais", aiRoutes);
app.use("/api/chat", chatRoutes);

async function startServer() {
  if (!process.env.JWT_SECRET || !process.env.MYSQL_HOST || !process.env.MYSQL_USER || !process.env.MYSQL_DATABASE) {
    console.error("JWT_SECRET, MYSQL_HOST, MYSQL_USER, and MYSQL_DATABASE must be set in backend/.env.");
    process.exit(1);
  }
  try {
    await pool.query("SELECT 1");
    console.log("MySQL connected");
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
    process.exit(1);
  }
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI must be set in backend/.env.");
    process.exit(1);
  }
  try {
    await connectMongo();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
  app.listen(port, () => console.log(`ZeroMind API listening on port ${port}`));
}
startServer();
