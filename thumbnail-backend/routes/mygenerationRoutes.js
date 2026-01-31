// import express from "express";
// import { getMyGenerations } from "../controllers/myGenerationsController.js";

// const router = express.Router();

// // ✅ THIS PATH IS IMPORTANT
// router.get("/generations/my", getMyGenerations);

// // export default router;

import express from "express";
import {
  getMyGenerations,
  deleteGeneration,
} from "../controllers/myGenerationsController.js";
import protect from "../middleware/authMiddleware.js";

console.log("🚨 generationRoutes FILE LOADED");

const router = express.Router();

router.get("/my-generations", protect, getMyGenerations);
router.delete("/my-generations/:id", protect, (req, res, next) => {
  console.log("🚨 DELETE ROUTE MATCHED");
  next();
}, deleteGeneration);


export default router;
