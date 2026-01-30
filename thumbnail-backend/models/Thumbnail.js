import mongoose from "mongoose";

const thumbnailSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    ratio: String,
    colorScheme: String,
    style: String,
    extraPrompt: String,
    generatedPrompt: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Thumbnail = mongoose.model("Thumbnail", thumbnailSchema);

export default Thumbnail;
