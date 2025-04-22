import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import { hashPassword,comparePassword } from "../helpers/authHelper.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";


export const registerController = async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        message: "User already exists",
        success: false,
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });
    await user.save();
    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user,
    });
  } catch (error) {
    
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


export const loginController=async(req,res)=>{
  try {
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
      return res.status(200).json({
        message:"User not found",
        success:false
      })
    }
    const match=await comparePassword(password,user.password);
    if(!match){
      return res.status(200).json({
        message:"Invalid credentials",
        success:false
      })
    }
    const token=jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({
      message: "Login successful",
      success: true,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}

// @forgot-password || Method: POST
// @access: Public
export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const message = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request - Action Required",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-bottom: 1px solid #e9ecef;">
            <h1 style="color: #2c3e50; margin: 0;">YourAppName</h1>
          </div>
          
          <div style="padding: 30px 20px;">
            <h2 style="color: #2c3e50; margin-top: 0;">Password Reset Request</h2>
            
            <p>Hello ${user.name},</p>
            
            <p>We received a request to reset your password for YourAppName account associated with ${user.email}.</p>
            
            <p style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #E57317; color: white; padding: 12px 24px; 
                        text-decoration: none; border-radius: 4px; font-weight: bold;">
                Reset Your Password
              </a>
            </p>
            
            <p>This link will expire in <strong>15 minutes</strong>. If you didn't request a password reset, 
            please ignore this email or contact support if you have questions.</p>
            
            <p style="font-size: 12px; color: #7f8c8d; margin-top: 30px;">
              For security reasons, we don't store your password. This link gives you access to reset it.
            </p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center; 
                      font-size: 12px; color: #7f8c8d; border-top: 1px solid #e9ecef;">
            <p>© ${new Date().getFullYear()} YourAppName. All rights reserved.</p>
            <p>
              YourAppName Inc.<br>
              123 Business Street, City, Country
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(message);

    res.status(200).json({ success: true, message: "Reset email sent successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// @reset-password || Method: POST
// @access: Public
export const resetPasswordController = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // 1. Hash the reset token from URL to compare it with the stored hashed token in the DB
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // 2. Find the user by the hashed reset token and check if it has expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }, // Check if the token has expired
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // 3. Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    // 4. Clear the reset token and expiry from the user record (for security)
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });

  } catch (error) {
    
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// @test || Method: GET
// @access: Protected
export const testController=(req,res)=>{
  res.send("Protected route")
}

// @isAdmin || Method: GET
// @access: Protected
export const isAdminPage=async(req,res)=>{
  res.send("Admin page")
}

export const getAllUsersController=async(req,res)=>{
  try {
    const users=await User.find({role:0});
    res.status(200).json({
      success:true,
      message:"All users fetched successfully",
      users
    })
  } catch (error) {
    
    res.status(500).json({
      success:false,
      message:error.message    
    })
  }
}

// Order
export const getOrderController=async(req,res)=>{
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");

    res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}