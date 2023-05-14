import express from "express";
import { protect } from "../middleware/authorization.js";
import {
  createUsers,
  getUsers,
  getUsersById,
  // deleteUser,
  updateUser,
  updateMaintainer,
  login,
  getUserProfile,
  logout,
  getMaintainers,
} from "../controllers/usercontroller.js";

const router = express.Router();

router.post("/createUsers", createUsers);

router.get("/getUsers", getUsers);

router.get("/getMaintainers", getMaintainers);

router.get("/get/:id", getUsersById);

// router.delete("/delete/:id", deleteUser);

router.post("/updateUser/:id", updateUser);

router.post("/updateMaintainer/:id", updateMaintainer);

router.post("/login", login);

router.get("/getUserProfile", protect, getUserProfile);

router.post("/logout", logout);

export default router;
