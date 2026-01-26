import mongoose from "mongoose";

const thumbnailSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    ratio: { type: String, default: "16:9" },
    colorScheme: { type: String },
    style: { type: String },
    extraPrompt: { type: String },
    generatedPrompt: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Thumbnail", thumbnailSchema);
