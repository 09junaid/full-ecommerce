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


// @ config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// @ middleware
app.use(cors({
  origin: "http://localhost:5173", // for Vite
  credentials: true,
}));
app.use(bodyParser.json());
app.use(express.json());

// @ routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", catagoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/contact", contactRoute);


app.get("/",(req,res)=>{
  res.send({
    activeStatus:true,
    error:false,
  })
})
const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port:: ${PORT}`.bgCyan.white);
    });
  } catch (error) {
    console.log("❌ Error starting server:", error);
  }
};

start();
