import express from "express";
import { protect } from "../middleware/authorization.js";
import { upload } from "../middleware/errorMiddleware.js";

import {
  createComplaint,
  getAllComplaint,
  getOwnComplaint,
  deleteComplaint,
} from "../controllers/complaintcontroller.js";

const router = express.Router();

router.post(
  "/createComplaint",
  protect,
  upload.single("file"),
  createComplaint
);

router.get("/getAllComplaint", getAllComplaint);

router.get("/getOwnComplaint", protect, getOwnComplaint);

router.delete("/deleteComplaint/:id", deleteComplaint);

export default router;
