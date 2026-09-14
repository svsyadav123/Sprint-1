import { Router } from "express";
import mongoose from "mongoose";
import AI from "../models/AI.js";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import requireAuth from "../middleware/requireAuth.js";
import { isMongoConnected } from "../database/mongo.js";
import { generateResponse } from "../services/openrouter.js";

const router = Router();
const unavailable = (response) => response.status(503).json({ success: false, message: "Chat storage is temporarily unavailable." });

function titleFrom(content, hasImage) {
  if (!content) return hasImage ? "Image discussion" : "New conversation";
  return content.trim().split(/\s+/).slice(0, 6).join(" ").replace(/[.?!,:;]+$/, "") || "New conversation";
}

function validImage(image) {
  if (!image) return true;
  return typeof image.name === "string" && typeof image.mimeType === "string" && /^image\/(jpeg|png|gif|webp)$/i.test(image.mimeType) && typeof image.dataUrl === "string" && /^data:image\/(jpeg|png|gif|webp);base64,/i.test(image.dataUrl) && image.dataUrl.length <= 5500000;
}

function modelPreferenceFrom(body = {}) {
  const value = body.modelPreference ?? body.modelLevel;
  const normalized = typeof value === "string" ? value.toLowerCase() : "";
  return { low: "Low", medium: "Medium", high: "High" }[normalized] || (value === "Low" || value === "Medium" || value === "High" ? value : "Medium");
}

async function ownedAi(aiId, userId) {
  if (!mongoose.isValidObjectId(aiId)) return null;
  return AI.findOne({ _id: aiId, userId });
}

router.use(requireAuth);
router.use((request, response, next) => isMongoConnected() ? next() : unavailable(response));

router.post("/:aiId/conversations", async (request, response) => {
  try {
    const ai = await ownedAi(request.params.aiId, request.auth.userId);
    if (!ai) return response.status(404).json({ success: false, message: "AI not found." });
    const modelPreference = ["Low", "Medium", "High"].includes(request.body.modelPreference) ? request.body.modelPreference : "Medium";
    const conversation = await Conversation.create({ userId: request.auth.userId, aiId: ai._id, title: "New conversation", modelPreference });
    response.status(201).json({ success: true, conversation });
  } catch (error) {
    console.error("Create conversation failed:", error.message);
    response.status(500).json({ success: false, message: "Unable to create a new chat." });
  }
});

router.delete("/:aiId/:conversationId", async (request, response) => {
  try {
    const ai = await ownedAi(request.params.aiId, request.auth.userId);
    if (!ai || !mongoose.isValidObjectId(request.params.conversationId)) return response.status(404).json({ success: false, message: "Conversation not found." });
    const conversation = await Conversation.findOneAndDelete({ _id: request.params.conversationId, userId: request.auth.userId, aiId: ai._id });
    if (!conversation) return response.status(404).json({ success: false, message: "Conversation not found." });
    await Message.deleteMany({ conversationId: conversation._id, userId: request.auth.userId });
    response.json({ success: true, message: "Conversation deleted successfully." });
  } catch (error) {
    console.error("Delete chat failed:", error.message);
    response.status(500).json({ success: false, message: "Unable to delete this chat." });
  }
});

router.get("/:aiId", async (request, response) => {
  try {
    const ai = await ownedAi(request.params.aiId, request.auth.userId);
    if (!ai) return response.status(404).json({ success: false, message: "AI not found." });
    const conversations = await Conversation.find({ userId: request.auth.userId, aiId: ai._id }).sort({ updatedAt: -1 });
    const { conversationId } = request.query;
    if (!conversationId) return response.json({ success: true, conversations, messages: [] });
    if (!mongoose.isValidObjectId(conversationId)) return response.status(404).json({ success: false, message: "Conversation not found." });
    const conversation = await Conversation.findOne({ _id: conversationId, userId: request.auth.userId, aiId: ai._id });
    if (!conversation) return response.status(404).json({ success: false, message: "Conversation not found." });
    const messages = await Message.find({ conversationId: conversation._id, userId: request.auth.userId }).sort({ createdAt: 1 });
    response.json({ success: true, conversations, conversation, messages });
  } catch (error) { console.error("Load chat failed:", error.message); response.status(500).json({ success: false, message: "Unable to load chats." }); }
});

router.post("/:aiId", async (request, response) => {
  try {
    const ai = await ownedAi(request.params.aiId, request.auth.userId);
    if (!ai) return response.status(404).json({ success: false, message: "AI not found." });
    const rawContent = request.body.content ?? request.body.message;
    const content = typeof rawContent === "string" ? rawContent.trim() : "";
    const image = request.body.image || null;
    const modelPreference = modelPreferenceFrom(request.body);
    if ((!content && !image) || content.length > 6000) return response.status(400).json({ success: false, message: "Enter a message or select an image." });
    if (!validImage(image)) return response.status(400).json({ success: false, message: "Use a JPG, PNG, GIF, or WebP image under 4 MB." });
    let conversation;
    if (request.body.conversationId) {
      if (!mongoose.isValidObjectId(request.body.conversationId)) return response.status(404).json({ success: false, message: "Conversation not found." });
      conversation = await Conversation.findOne({ _id: request.body.conversationId, userId: request.auth.userId, aiId: ai._id });
      if (!conversation) return response.status(404).json({ success: false, message: "Conversation not found." });
    } else {
      conversation = new Conversation({ userId: request.auth.userId, aiId: ai._id, title: titleFrom(content, Boolean(image)), modelPreference });
    }
    const previousMessages = await Message.find({ conversationId: conversation._id, userId: request.auth.userId }).sort({ createdAt: 1 });
    let assistantText;
    try {
      assistantText = await generateResponse({ ai, messages: previousMessages, content, image, modelPreference });
    } catch (error) {
      console.error("OpenRouter response failed:", error.message);
      const status = error.message === "OpenRouter API key is not configured." ? 503 : 502;
      const message = status === 503 ? "AI service is not configured yet. Add OPENROUTER_API_KEY to backend/.env." : "The AI service is temporarily unavailable. Please try again.";
      return response.status(status).json({ success: false, message });
    }
    conversation.modelPreference = modelPreference;
    await conversation.save();
    const userMessage = await Message.create({ conversationId: conversation._id, userId: request.auth.userId, sender: "user", text: content, image });
    const assistantMessage = await Message.create({ conversationId: conversation._id, userId: request.auth.userId, sender: "ai", text: assistantText });
    conversation.updatedAt = new Date(); await conversation.save();
    response.status(201).json({ success: true, conversationId: conversation._id, message: { role: "assistant", content: assistantText }, conversation, messages: [userMessage, assistantMessage] });
  } catch (error) { console.error("Send chat failed:", error.message); response.status(500).json({ success: false, message: "Unable to send your message." }); }
});

export default router;
