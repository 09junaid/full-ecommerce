import express from "express";
import { createOrder,getAllOrders,getAllTypeOrders,updateOrderStatus } from "../controllers/orderController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/my-order",requireSignIn, createOrder);
router.get("/all-orders",requireSignIn, getAllOrders);
router.get("/get-all-orders",requireSignIn,isAdmin,getAllTypeOrders);
router.put("/order-status/:orderId",requireSignIn,isAdmin,updateOrderStatus);


export default router;
