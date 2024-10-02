import express from "express";
const router = express.Router();

import { authenticate, authorizeAdmin } from "../middlewares/auth.js";
import { createOrder, getAllOrders } from "../controllers/orderController.js";

router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, authorizeAdmin, getAllOrders);

export default router;
