import express from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  getCategoryController,
  deleteCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//Category ROutes
//create Catergory
router.post("/create", isAuth, createCategoryController);

//Get All Category
router.get("/get-all", getCategoryController);

//Delete Category
router.delete("/delete/:id", isAuth, deleteCategoryController);

//Update Category
router.patch("/update/:id", isAuth, updateCategoryController);

export default router;
