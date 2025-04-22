import express from "express";
const router = express.Router();
import formidable from "express-formidable";
import {
  createProductController,
  getProductController,
  updateProductController,
  getSingleProductController,
  deleteProductController,
  productPhotoController,
  productCountController,
  productListController,
  relatedProductController,
  productCategoryController
} from "../controllers/productController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

// @ create Product || Method: POST
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// @ get Product || Method: GET
router.get("/get-product", getProductController);

// @ get single Product || Method: GET
router.get("/single-product/:slug", getSingleProductController);

// @ update Product || Method: PUT
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// @ get Photo || Method: GET
router.get("/product-photo/:pid", productPhotoController);

// @ delete Product || Method: DELETE
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  deleteProductController
);

// @ product count || Method: GET
router.get("/product-count",productCountController)

// @ product per page || Method: GET
router.get("/product-list/:page",productListController)

// @ similar product || Method: GET
router.get("/related-product/:pid/:cid",relatedProductController)

// catagories wise products
router.get("/product-category/:slug",productCategoryController)
export default router;
