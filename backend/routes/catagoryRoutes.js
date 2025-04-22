import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createCatagoryController,
  updateCatagoryController,
  getAllCatagoryController,
  getByIdCatagoryController,
  deleteCatagoryController,
} from "../controllers/catagoryController.js";
const router = express.Router();

// @ routes
// @ create catagory || Method: POST
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCatagoryController
);

// @ Update catagory || Method: PUT
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCatagoryController
);

// @ Get-ALL Catagory || Method: GET
router.get(
  "/get-catagory",
  getAllCatagoryController
);

// @ Get-By-ID Catagory || Method: GET
router.get(
  "/single-catagory/:slug",
  getByIdCatagoryController
);

// @ Delete Catagory || Method: DELETE
router.delete(
  "/delete-catagory/:id",
  requireSignIn,
  isAdmin,
  deleteCatagoryController
);
export default router;
