import mongoose from "mongoose";

const aiSchema = new mongoose.Schema({
  userId: { type: Number, required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 60 },
  type: { type: String, required: true, trim: true, maxlength: 80 },
  customType: { type: String, trim: true, maxlength: 80, default: "" },
  purpose: { type: String, required: true, trim: true, maxlength: 1000 },
  personality: { type: String, required: true, trim: true, maxlength: 40 },
  behavior: { type: String, trim: true, maxlength: 1000, default: "" },
  learningTopics: { type: [String], required: true, validate: [(topics) => topics.length >= 1 && topics.length <= 3, "Choose between 1 and 3 learning topics."] },
}, { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } });

export default mongoose.model("AI", aiSchema);
