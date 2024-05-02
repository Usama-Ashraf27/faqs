import express from "express";

import { singleUpload } from "../middlewares/multer.js";
import {
  addReviewController,
  createProductcontroller,
  getAllProductsController,
  updateProductController,
  deleteProductController,
} from "../controllers/productController.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create Product
router.post("/create", isAuth, singleUpload, createProductcontroller);

//Update Product
router.patch("/:id", isAuth, updateProductController);

//GET ALL PRODUCT
router.get("/get-all", getAllProductsController);

//delete product
router.delete("/:id", deleteProductController);

//Add reviw
router.post("/:id/add-reviw", addReviewController);

export default router;
