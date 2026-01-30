import Thumbnail from "../models/Thumbnail.js";

export const getMyGenerations = async (req, res) => {
  try {
    const thumbnails = await Thumbnail.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    res.json(thumbnails);
  } catch (err) {
    console.error("MyGenerations error:", err.message);
    res.status(500).json({ message: "Failed to fetch generations" });
  }
};
