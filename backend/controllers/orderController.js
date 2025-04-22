import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    const { products, payment, buyerName, buyerEmail } = req.body;

    // Ensure user is authenticated
    if (!req.user?._id) {
      return res.status(401).json({ error: "Authentication required" });
    }

    // Validate required fields
    if (!products || !payment) {
      return res.status(400).json({ error: "Products and payment are required" });
    }


    const order = new Order({
      products,
      payment,
      buyer: req.user._id, // Set buyer to authenticated user's ID
      buyerName: buyerName || req.user.name, // Fallback to req.user.name if available
      buyerEmail: buyerEmail || req.user.email, // Fallback to req.user.email
      status: "Processing", // Add default status if needed
    });

    await order.save();

    res.status(200).json({ message: "Order Created", order });
  } catch (error) {
    console.error("Order Error:", error.message);
    res.status(500).json({ error: "Order failed" });
  }
};

// Add this to your order controller
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("buyer", "name email")   // ✅ using correct field name 'buyer'
      .populate("products", "-photo");

    res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Order Error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch orders",
    });
  }
};


export const getAllTypeOrders=async(req,res)=>{
    try {
      const orders = await Order.find({})
        .populate({
          path: 'buyer',
          select: 'name email',
          model: 'User' // explicitly specify the model
        })
        .populate({
          path: 'products',
          select: '-photo',
          model: 'Product' // explicitly specify the model
        })
        .sort({ createdAt: -1 });
  
      res.status(200).json({
        success: true,
        message: "All orders fetched successfully",
        orders,
      });
    } catch (error) {
      console.error("Order Error:", error.message);
      res.status(500).json({
        success: false,
        error: "Failed to fetch orders",
      });
    }
  };

  export const updateOrderStatus=async(req,res)=>{
    try {
      const {orderId}=req.params;
      const {status}=req.body;
      const updatedOrder=await Order.findByIdAndUpdate(orderId,{status},{new:true});
      res.status(200).json({
        success:true,
        message:"Order status updated successfully",
        updatedOrder
      })
    } catch (error) {
      res.status(500).json({
        success:false,
        message:error.message
      })
      
    }
  }
