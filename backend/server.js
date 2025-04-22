import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import catagoryRoute from "./routes/catagoryRoutes.js";
import productRoute from "./routes/productRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import contactRoute from "./routes/contactRoute.js";
import orderRoute from "./routes/orderRoutes.js";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();
await connectDB(); // ✅ Vercel mein await top-level pe allowed hai (ESM only)

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", catagoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/contact", contactRoute);

// Test Route
app.get("/", (req, res) => {
  res.send({ activeStatus: true, error: false });
});

// ✅ Export App for Vercel
export default app;
