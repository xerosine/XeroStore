import express from "express";
const router = express.Router();

import { authenticate, authorizeAdmin } from "../middlewares/auth.js";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countAllOrders,
  calculateTotalSales,
  calculateSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered
} from "../controllers/orderController.js";
import checkId from "../middlewares/checkId.js";

router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, authorizeAdmin, getAllOrders);

router.get("/mine", authenticate, getUserOrders);
router.get("/total-orders", authenticate, authorizeAdmin, countAllOrders);
router.get("/total-sales", authenticate, authorizeAdmin, calculateTotalSales)
router.get('/total-sales-by-date', authenticate, authorizeAdmin, calculateSalesByDate)
router.get('/:id', authenticate, findOrderById)
router.put('/:id/pay', authenticate, checkId, markOrderAsPaid)
router.put('/:id/deliver', authenticate, authorizeAdmin, checkId, markOrderAsDelivered)

export default router;
