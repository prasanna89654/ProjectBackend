import express from "express";
import { protect } from "../middleware/authorization.js";
import {
  createUsers,
  getUsers,
  getUsersById,
  deleteUser,
  updateUser,
  login,
  getUserProfile,
  logout,
} from "../controllers/usercontroller.js";

const router = express.Router();

router.post("/createUsers", createUsers);

router.get("/getUsers", getUsers);

router.get("/get/:id", getUsersById);

router.delete("/delete/:id", deleteUser);

router.post("/update", updateUser);

router.post("/login", login);

router.get("/getUserProfile", protect, getUserProfile);

router.post("/logout", logout);

export default router;
