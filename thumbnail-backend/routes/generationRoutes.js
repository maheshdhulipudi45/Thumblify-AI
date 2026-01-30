import express from "express";
import { getMyGenerations } from "../controllers/myGenerationsController.js";

const router = express.Router();

// ✅ THIS PATH IS IMPORTANT
router.get("/generations/my", getMyGenerations);

export default router;
