import express from "express";
import { protect } from "../middleware/authorization.js";

import {
  createComplaint,
  getAllComplaint,
  getOwnComplaint,
  createPurchase,
  getAllPurchases,
} from "../controllers/complaintcontroller.js";

const router = express.Router();

router.post("/createComplaint", protect, createComplaint);

router.get("/getAllComplaint", getAllComplaint);

router.get("/getOwnComplaint", protect, getOwnComplaint);

router.post("/createPurchase", createPurchase);

router.get("/getAllPurchases", getAllPurchases);

export default router;
