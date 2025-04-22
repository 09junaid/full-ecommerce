import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
  testController,
  isAdminPage,
  getAllUsersController,getOrderController
} from "../controllers/authControllers.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
//router Object
const router = express.Router();
// @routing
// @register || Method: POST
router.post("/register", registerController);

// @login || Method: POST
router.post("/login", loginController);

// @test || Method: GET
// @access: Protected
router.get("/test", requireSignIn, testController);
router.get("/isAdmin", requireSignIn, isAdmin, isAdminPage);

// @forgot-password || Method: POST
// @access: Public
router.post("/forgot-password", forgotPasswordController);
// @reset-password || Method: POST
// @access: Public
router.post("/reset-password/:token", resetPasswordController);

// @protected User route || Method: GET
// @access: Protected
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// @protected Admin route || Method: GET
// @access: Protected
router.get("/admin-auth", requireSignIn ,isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// @ get all users || Method: GET
// @access: Protected
router.get("/get-all-users", requireSignIn ,isAdmin,getAllUsersController);


// @ get all product users || Method: GET
// @access: Protected
router.get("/user-order", requireSignIn,getOrderController);


export default router;
