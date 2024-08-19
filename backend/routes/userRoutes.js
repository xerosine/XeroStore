import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUser,
  updateCurrentUser,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);

router.route("/login").post(loginUser);

router.post("/logout", logoutUser);

router
  .route("/profile")
  .get(authenticate, getCurrentUser)
  .put(authenticate, updateCurrentUser);

//Admin routes

router
  .route("/:id")
  .get(authenticate, authorizeAdmin, getUser)
  .delete(authenticate, authorizeAdmin, deleteUser)
  .put(authenticate, authorizeAdmin, updateUser);

export default router;
