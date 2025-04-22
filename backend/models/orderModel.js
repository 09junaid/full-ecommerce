import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  }],
  payment: {
    type: Object,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Ensure this is referencing the User model
  },
  buyerName: String,
  buyerEmail: String,
  status: {
    type: String,
    default: "Pending",
  },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
