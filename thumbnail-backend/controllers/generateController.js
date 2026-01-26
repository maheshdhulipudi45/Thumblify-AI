import { generateImage } from "../utils/hfImage.js";
import cloudinary from "../config/cloudinary.js";

export const generateThumbnail = async (req, res) => {
  try {
    const { title, style, colorScheme, ratio } = req.body;

    if (!title || !style || !colorScheme?.name || !ratio) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const prompt = `
YouTube thumbnail, bold text, high contrast,
${style} style,
${colorScheme.name} color scheme,
aspect ratio ${ratio},
title text: ${title},
clean background, professional, sharp, modern design
`;

    const imageBuffer = await generateImage(prompt);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload_stream(
        { folder: "thumbnails" },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      ).end(imageBuffer);
    });

    return res.json({
      success: true,
      data: {
        imageUrl: uploadResult.secure_url, // ✅ NOW PRESENT
      },
    });

  } catch (err) {
    console.error("❌ Generation error FULL:", err.message);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
