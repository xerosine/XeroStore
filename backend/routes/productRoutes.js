import express from "express";
import formidable from "express-formidable";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";
import checkId from "../middlewares/checkId.js";
import {
  addProduct,
  addProductReview,
  fetchAllproducts,
  fetchNewProducts,
  fetchProduct,
  fetchProducts,
  fetchTopProducts,
  removeProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);

router.get("/allproducts", fetchAllproducts);
router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

router
  .route("/:id")
  .get(fetchProduct)
  .put(authenticate, authorizeAdmin, formidable(), updateProduct)
  .delete(authenticate, authorizeAdmin, removeProduct);

router.post("/:id/reviews", authenticate, checkId, addProductReview);

export default router;
