// import Thumbnail from "../models/Thumbnail.js";

// export const getMyGenerations = async (req, res) => {
//   try {
//     const thumbnails = await Thumbnail.find({
//       userId: req.userId,
//     }).sort({ createdAt: -1 });

//     res.json(thumbnails);
//   } catch (err) {
//     console.error("MyGenerations error:", err.message);
//     res.status(500).json({ message: "Failed to fetch generations" });
//   }
// };


// export const getMyGenerations = async (req, res) => {
//   try {
//     const thumbnails = await Thumbnail.find({
//       user: req.userId, // 🔥 ONLY logged-in user
//     }).sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       data: thumbnails,
//     });
//   } catch (error) {
//     console.error("❌ History fetch error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch history",
//     });
//   }
// };

import Thumbnail from "../models/Thumbnail.js";

export const getMyGenerations = async (req, res) => {
  const thumbnails = await Thumbnail.find({
    user: req.userId,
  }).sort({ createdAt: -1 });

  res.json({ success: true, data: thumbnails });
};

export const deleteGeneration = async (req, res) => {
  console.log("🔥 DELETE HIT:", req.params.id); // 🔥 debug

  const thumbnail = await Thumbnail.findOne({
    _id: req.params.id,
    user: req.userId,
  });

  if (!thumbnail) {
    return res.status(404).json({ message: "Not found" });
  }

  await thumbnail.deleteOne();
  res.json({ success: true });
};
