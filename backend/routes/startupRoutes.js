import express from "express";
import {
  createStartup,
  getAllStartups,
  getStartupById
} from "../controllers/startupController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public / Investor
router.get("/", getAllStartups);
router.get("/:id", getStartupById);

// Business only
router.post(
  "/",
  protect,
  authorizeRoles("business"),
  createStartup
);

export default router;
