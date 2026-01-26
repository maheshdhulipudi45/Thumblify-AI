import express from "express";
import { generateThumbnail } from "../controllers/generateController.js";

const router = express.Router();

router.post("/generate-thumbnail", generateThumbnail);

export default router;
