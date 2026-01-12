import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/business-only",
  protect,
  authorizeRoles("business"),
  (req, res) => {
    res.json({
      message: "Welcome Business User",
      user: req.user
    });
  }
);

export default router;
