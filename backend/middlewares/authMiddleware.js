import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    // 1. Check if authorization header exists
    if (!req.headers.authorization) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing"
      });
    }

    // 2. Extract token (handle "Bearer " prefix)
    const token = req.headers.authorization.replace('Bearer ', '');

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Check if decoded data is valid
    if (!decoded || !decoded._id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload"
      });
    }

    // 5. Attach user ID to request
    req.user = { _id: decoded._id };
    next();

  } catch (error) {

    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Token expired"
      });
    }

    res.status(500).json({
      success: false,
      message: "Authentication failed",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    // 1. Ensure user is authenticated first
    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    // 2. Find user in database
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // 3. Check admin role (assuming 1 is admin)
    if (user.role !== 1) {
      return res.status(403).json({
        success: false,
        message: "Admin access required"
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Admin verification failed",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};