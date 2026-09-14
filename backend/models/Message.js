import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true, index: true },
  userId: { type: Number, required: true, index: true },
  sender: { type: String, enum: ["user", "ai"], required: true },
  text: { type: String, trim: true, maxlength: 6000, default: "" },
  image: {
    name: { type: String, trim: true, maxlength: 160 },
    mimeType: { type: String, trim: true, maxlength: 60 },
    dataUrl: { type: String, maxlength: 5500000 },
  },
}, { timestamps: true });

messageSchema.index({ conversationId: 1, createdAt: 1 });

export default mongoose.model("Message", messageSchema);
