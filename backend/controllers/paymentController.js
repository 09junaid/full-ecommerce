// controllers/paymentController.js

import { stripe } from "../config/stripe.js";

export const createPaymentIntent = async (req, res) => {
  try {
    const { cartItems, userId } = req.body;

    // ✅ Calculate total amount
    const amount = cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // convert to cents
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        userId,
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.error("Payment Intent Error:", error);
    res.status(500).json({ message: "Payment failed" });
  }
};
