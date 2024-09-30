import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategories,
  readCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, authorizeAdmin, createCategory)
  .get(listCategories);

router
  .route("/:categoryId")
  .put(authenticate, authorizeAdmin, updateCategory)
  .delete(authenticate, authorizeAdmin, removeCategory)
  .get(readCategory);

export default router;
