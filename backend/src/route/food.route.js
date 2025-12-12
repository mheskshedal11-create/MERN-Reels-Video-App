import express from "express";
import { createFoodController } from "../controllers/food.controller.js";
import multer from "multer";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

const upload = multer();

router.post("/", upload.single("video"), authMiddleware, createFoodController);

export default router;
