import { Router } from "express";
import mongoose from "mongoose";
import AI from "../models/AI.js";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import requireAuth from "../middleware/requireAuth.js";
import { isMongoConnected } from "../database/mongo.js";

const router = Router();
const personalities = ["Friendly", "Professional", "Helpful", "Funny", "Motivational", "Patient", "Strict", "Creative", "Direct", "Calm"];
const unavailable = (response) => response.status(503).json({ success: false, message: "AI storage is not configured yet. Add MONGO_URI to backend/.env." });

function cleanAiInput(body = {}) {
  const value = (key) => typeof body[key] === "string" ? body[key].trim() : "";
  const learningTopics = Array.isArray(body.learningTopics) ? [...new Set(body.learningTopics.filter((topic) => typeof topic === "string").map((topic) => topic.trim()).filter(Boolean))] : [];
  return { name: value("name"), type: value("type"), customType: value("customType"), purpose: value("purpose"), personality: value("personality"), behavior: value("behavior"), learningTopics };
}

function validateAi(data) {
  if (!data.name || !data.type || !data.purpose || !data.personality) return "Name, type, personality and purpose are required.";
  if (data.type === "Other" && !data.customType) return "Please describe the custom AI type.";
  if (!personalities.includes(data.personality)) return "Choose a valid personality.";
  if (data.learningTopics.length < 1 || data.learningTopics.length > 3) return "Choose between 1 and 3 learning topics.";
  return null;
}

router.use(requireAuth);
router.use((request, response, next) => isMongoConnected() ? next() : unavailable(response));
router.get("/", async (request, response) => response.json({ success: true, ais: await AI.find({ userId: request.auth.userId }).sort({ createdAt: -1 }) }));
router.post("/", async (request, response) => {
  try {
    const aiCount = await AI.countDocuments({ userId: request.auth.userId });
    if (aiCount >= 3) return response.status(409).json({ success: false, message: "Maximum 3 AIs allowed." });
    const data = cleanAiInput(request.body); const error = validateAi(data);
    if (error) return response.status(400).json({ success: false, message: error });
    const ai = await AI.create({ ...data, userId: request.auth.userId });
    response.status(201).json({ success: true, message: "AI created successfully", ai });
  } catch (error) { console.error("Create AI failed:", error.message); response.status(500).json({ success: false, message: "Unable to create your AI." }); }
});
router.get("/:id", async (request, response) => {
  if (!mongoose.isValidObjectId(request.params.id)) return response.status(404).json({ success: false, message: "AI not found." });
  const ai = await AI.findOne({ _id: request.params.id, userId: request.auth.userId });
  if (!ai) return response.status(404).json({ success: false, message: "AI not found." }); response.json({ success: true, ai });
});
router.put("/:id", async (request, response) => {
  if (!mongoose.isValidObjectId(request.params.id)) return response.status(404).json({ success: false, message: "AI not found." });
  const data = cleanAiInput(request.body); const error = validateAi(data);
  if (error) return response.status(400).json({ success: false, message: error });
  const ai = await AI.findOneAndUpdate({ _id: request.params.id, userId: request.auth.userId }, data, { new: true, runValidators: true });
  if (!ai) return response.status(404).json({ success: false, message: "AI not found." }); response.json({ success: true, message: "AI updated successfully", ai });
});
router.delete("/:id", async (request, response) => {
  if (!mongoose.isValidObjectId(request.params.id)) return response.status(404).json({ success: false, message: "AI not found." });
  const ai = await AI.findOne({ _id: request.params.id, userId: request.auth.userId });
  if (!ai) return response.status(404).json({ success: false, message: "AI not found." });
  const conversations = await Conversation.find({ aiId: ai._id, userId: request.auth.userId }).select("_id");
  const conversationIds = conversations.map((conversation) => conversation._id);
  if (conversationIds.length) await Message.deleteMany({ conversationId: { $in: conversationIds }, userId: request.auth.userId });
  await Conversation.deleteMany({ _id: { $in: conversationIds }, aiId: ai._id, userId: request.auth.userId });
  await ai.deleteOne();
  response.json({ success: true, message: "AI deleted successfully" });
});
export default router;
