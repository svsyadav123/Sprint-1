import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../database/mysql.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function userResponse(user) { return { id: user.id, name: user.name, email: user.email }; }
function tokenFor(user) { return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }); }
function normalizeInput(body = {}) {
  return { name: typeof body.name === "string" ? body.name.trim() : "", email: typeof body.email === "string" ? body.email.trim().toLowerCase() : "", password: typeof body.password === "string" ? body.password : "" };
}

router.post("/signup", async (request, response) => {
  try {
    const { name, email, password } = normalizeInput(request.body);
    if (!name || !email || !password) return response.status(400).json({ success: false, message: "Name, email and password are required." });
    if (!emailPattern.test(email)) return response.status(400).json({ success: false, message: "Enter a valid email address." });
    if (password.length < 6) return response.status(400).json({ success: false, message: "Password must be at least 6 characters." });
    const [existingUsers] = await pool.execute("SELECT id FROM users WHERE email = ? LIMIT 1", [email]);
    if (existingUsers.length) return response.status(409).json({ success: false, message: "Email already registered." });
    const hashedPassword = await bcrypt.hash(password, 12);
    const [result] = await pool.execute("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)", [name, email, hashedPassword]);
    response.status(201).json({ success: true, message: "Account created successfully", user: { id: result.insertId, name, email } });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") return response.status(409).json({ success: false, message: "Email already registered." });
    console.error("Signup failed:", error.message);
    response.status(500).json({ success: false, message: "Unable to create your account." });
  }
});

router.post("/login", async (request, response) => {
  try {
    const { email, password } = normalizeInput(request.body);
    if (!email || !password || !emailPattern.test(email)) return response.status(400).json({ success: false, message: "Enter a valid email and password." });
    const [users] = await pool.execute("SELECT id, name, email, password_hash FROM users WHERE email = ? LIMIT 1", [email]);
    const user = users[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash))) return response.status(401).json({ success: false, message: "Invalid email or password." });
    response.json({ success: true, message: "Logged in successfully", token: tokenFor(user), user: userResponse(user) });
  } catch (error) { response.status(500).json({ success: false, message: "Unable to log in right now." }); }
});

router.get("/me", requireAuth, async (request, response) => {
  const [users] = await pool.execute("SELECT id, name, email FROM users WHERE id = ? LIMIT 1", [request.auth.userId]);
  if (!users.length) return response.status(404).json({ success: false, message: "User not found." });
  response.json({ success: true, user: users[0] });
});

router.put("/me", requireAuth, async (request, response) => {
  try {
    const name = typeof request.body.name === "string" ? request.body.name.trim() : "";
    const email = typeof request.body.email === "string" ? request.body.email.trim().toLowerCase() : "";
    if (!name || !email || !emailPattern.test(email)) return response.status(400).json({ success: false, message: "Enter a valid name and email." });
    const [existingUsers] = await pool.execute("SELECT id FROM users WHERE email = ? AND id <> ? LIMIT 1", [email, request.auth.userId]);
    if (existingUsers.length) return response.status(409).json({ success: false, message: "Email already registered." });
    await pool.execute("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, request.auth.userId]);
    response.json({ success: true, user: { id: request.auth.userId, name, email } });
  } catch (error) {
    console.error("Profile update failed:", error.message);
    response.status(500).json({ success: false, message: "Unable to update your profile." });
  }
});

router.put("/me/password", requireAuth, async (request, response) => {
  try {
    const currentPassword = typeof request.body.currentPassword === "string" ? request.body.currentPassword : "";
    const newPassword = typeof request.body.newPassword === "string" ? request.body.newPassword : "";
    if (!currentPassword || newPassword.length < 6) return response.status(400).json({ success: false, message: "Current password and a new password of at least 6 characters are required." });
    const [users] = await pool.execute("SELECT password_hash FROM users WHERE id = ? LIMIT 1", [request.auth.userId]);
    if (!users.length || !(await bcrypt.compare(currentPassword, users[0].password_hash))) return response.status(401).json({ success: false, message: "Current password is incorrect." });
    const passwordHash = await bcrypt.hash(newPassword, 12);
    await pool.execute("UPDATE users SET password_hash = ? WHERE id = ?", [passwordHash, request.auth.userId]);
    response.json({ success: true, message: "Password updated successfully." });
  } catch (error) {
    console.error("Password update failed:", error.message);
    response.status(500).json({ success: false, message: "Unable to update your password." });
  }
});

export default router;
