import express from "express"
const router = express.Router();
import {createPaymentIntent} from "../controllers/paymentController.js"
import {requireSignIn} from "../middlewares/authMiddleware.js"

router.post("/create-payment",requireSignIn,createPaymentIntent)
export default router