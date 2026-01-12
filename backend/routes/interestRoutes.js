import express from "express";
import {
  sendInterest,
  getInterestsForBusiness
} from "../controllers/interestController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Investor only
router.post(
  "/",
  protect,
  authorizeRoles("investor"),
  sendInterest
);

// Business only
router.get(
  "/business",
  protect,
  authorizeRoles("business"),
  getInterestsForBusiness
);

export default router;
