import express from "express";
import { generateThumbnail } from "../controllers/generateController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate-thumbnail", protect, generateThumbnail);

export default router;
