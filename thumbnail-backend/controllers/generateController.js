// import { generateImage } from "../utils/hfImage.js";
// import cloudinary from "../config/cloudinary.js";

// export const generateThumbnail = async (req, res) => {
//   try {
//     const { title, style, colorScheme, ratio } = req.body;

//     if (!title || !style || !colorScheme?.name || !ratio) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required fields",
//       });
//     }
    
// const prompt = `
// YouTube thumbnail background,
// ${style} style,
// ${colorScheme.name} color scheme,
// aspect ratio ${ratio},
// high contrast,
// clean background,
// modern professional design,
// empty space in center for text,
// no text, no words, no letters
// `;

//     const imageBuffer = await generateImage(prompt);

//     const uploadResult = await new Promise((resolve, reject) => {
//       cloudinary.v2.uploader.upload_stream(
//         { folder: "thumbnails" },
//         (err, result) => {
//           if (err) reject(err);
//           else resolve(result);
//         }
//       ).end(imageBuffer);
//     });

//     return res.json({
//       success: true,
//       data: {
//         imageUrl: uploadResult.secure_url, // ✅ NOW PRESENT
//       },
//     });

//   } catch (err) {
//     console.error("❌ Generation error FULL:", err.message);

//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
import Thumbnail from "../models/Thumbnail.js";
console.log("Thumbnail model 👉", Thumbnail);

export const generateThumbnail = async (req, res) => {
  try {
    const { title, style, colorScheme, ratio, extraPrompt } = req.body;

    if (!title || !style || !ratio) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const dummyImages = [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1280&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1280&auto=format&fit=crop",
       "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1280&auto=format&fit=crop",
       "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1280&auto=format&fit=crop",
      

    ];

    const imageUrl =
      dummyImages[Math.floor(Math.random() * dummyImages.length)];

    // 🔥 VERY IMPORTANT: save ALL required fields
    const thumbnail = await Thumbnail.create({
      user: req.userId, // 🔥 for MyGenerations
      title,
      ratio,
      colorScheme: colorScheme?.name || "",
      style,
      extraPrompt,
      generatedPrompt: `${title} | ${style}`,
      imageUrl,
    });

    return res.json({
      success: true,
      data: {
        imageUrl: thumbnail.imageUrl,
      },
    });
  } catch (err) {
    console.error("❌ Dummy generation error FULL:", err);
    res.status(500).json({
      success: false,
      message: "Dummy thumbnail generation failed",
    });
  }
};

