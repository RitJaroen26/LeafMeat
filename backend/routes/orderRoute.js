import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.post("/userorders", (req, res) => {
    console.log("/userorders hit");
    res.send({ message: "userorders rooute works" });
})
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;