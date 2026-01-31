// console.log("✅ generationRoutes loaded");

// import express from "express";
// import { generateThumbnail, } from "../controllers/generateController.js";
// import { getMyGenerations } from "../controllers/myGenerationsController.js";
// import protect from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/generate-thumbnail",  protect, generateThumbnail);
// router.get("/my-generations", protect, getMyGenerations);

// export default router;



import express from "express";
import { generateThumbnail } from "../controllers/generateController.js";
import { getMyGenerations } from "../controllers/myGenerationsController.js";
import protect from "../middleware/authMiddleware.js";

console.log("✅ generationRoutes loaded");

const router = express.Router();

router.post("/generate-thumbnail", protect, generateThumbnail);
router.get("/my-generations", protect, getMyGenerations);

export default router;
