import categoryModel from "../Models/categoryModel.js";
import productModel from "../Models/productModel.js";
import mongoose from "mongoose";

//Create a new Category Controllwer
export const createCategoryController = async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) {
      return res.status(404).send({
        success: false,
        massage: "Please enter a category name",
      });
    }
    await categoryModel.create({ category });
    res.status(201).send({
      success: true,
      message: `${category}Category created successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      Message: "Error creating category APi",
    });
  }
};

//Get All Categories
//Get All Categories with Products
export const getCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find().populate("products");
    res.status(200).send({
      success: true,
      message: "Categories fetched successfully with products",
      totalCategories: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in GET ALL category API",
      error: error.message,
    });
  }
};

//Delete  CATtegory controller
export const deleteCategoryController = async (req, res) => {
  try {
    // Find the category
    const category = await categoryModel.findById(req.params.id);

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }


    const products = await productModel.find({ category: category._id });


    await Promise.all(
      products.map(async (product) => {
        product.category = undefined;
        await product.save();
      })
    );

    // Delete the category
    await category.deleteOne();

    // Update the categories list
    const updatedCategoriesList = await categoryModel.find();

    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
      categories: updatedCategoriesList,
    });
  } catch (error) {
    console.error("Error deleting category:", error);

    // Handle CastError or ObjectId errors
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }

    res.status(500).send({
      success: false,
      message: "Error In DELETE CAT API",
      error,
    });
  }
};

//Update Category
export const updateCategoryController = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { updatedCategoryName, category } = req.body;

   
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid categoryId format",
      });
    }
    const existingCategory = await categoryModel.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }


    if (updatedCategoryName) {
      existingCategory.category = updatedCategoryName;
    }

    // Save changes to the category
    await existingCategory.save();

    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
    });
  } catch (error) {
    console.error("Error in updateCategoryController:", error);

    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }

    res.status(500).send({
      success: false,
      message: "Error In UPDATE CATEGORY API",
      error,
    });
  }
};
//Single category
export const SinglegetCategoryController = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await categoryModel
      .findById(categoryId)
      .populate("products");


    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
