import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  userId: { type: Number, required: true, index: true },
  aiId: { type: mongoose.Schema.Types.ObjectId, ref: "AI", required: true, index: true },
  title: { type: String, required: true, trim: true, maxlength: 100 },
  modelPreference: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
}, { timestamps: true });

conversationSchema.index({ userId: 1, aiId: 1, updatedAt: -1 });

export default mongoose.model("Conversation", conversationSchema);
