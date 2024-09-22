import express from "express";
import { upload } from "../middleware/errorMiddleware.js";
import {
  createRequest,
  getRequest,
  deleteRequest,
  createFileRequest,
  getFile,
  createmulti,
  getmulti,
} from "../controllers/maintainercontroller.js";

const router = express.Router();

router.post("/createRequest", upload.single("file"), createRequest);

router.get("/getRequest", getRequest);

router.delete("/deleteRequest/:id", deleteRequest);

router.post("/createFileRequest", upload.single("file"), createFileRequest);

router.get("/getFile", getFile);

router.post("/createmulti", createmulti);

router.get("/getmulti", getmulti);

export default router;
