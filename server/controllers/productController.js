import categoryModel from "../Models/categoryModel.js";
import Products from "../Models/productModel.js";
import reviewModel from "../Models/reviewModel.js";
import { getDataUri } from "../utils/features.js";
import cloudinary from "cloudinary";

export const createProductcontroller = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      salePrice,
      stock,
      review,
      avrgrating,
      size,
      colors,
      sku,
      category,
    } = req.body;
    const images = [];
    const existingCategory = await categoryModel.findOne({ _id: category });

    if (!existingCategory) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    for (const file of req.files) {
      const dataUri = getDataUri(file);
      const uploadedImage = await cloudinary.uploader.upload(dataUri.content, {
        folder: "product-images",
      });
      images.push(uploadedImage.secure_url);
    }

    const newProduct = new Products({
      name,
      description,
      price,
      salePrice,
      stock,
      review,
      size,
      colors,
      sku,
      category,
      avrgrating,
      images,
    });

    // Update the category's products array
    existingCategory.products.push(newProduct._id);
    await existingCategory.save();

    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};
//update product
export const updateProductController = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Products.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//delete product
export const deleteProductController = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Products.findById(id);
    if (!product) {
      console.error("Product not found in deleteProductController:", id);
      return res.status(404).json({ error: "Product not found" });
    }
    const categoryId = product.category;
    const deletedProduct = await Products.findByIdAndDelete(id);
    if (!deletedProduct) {
      console.error("Error deleting product:", id);
      return res.status(500).json({ error: "Error deleting product" });
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      categoryId,
      { $pull: { products: id } },
      { new: true }
    );

    if (!updatedCategory) {
      console.error("Error updating category:", categoryId);
      return res.status(500).json({ error: "Error updating category" });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//Get All Product
export const getAllProductsController = async (req, res) => {
  try {
    const products = await Products.find();

    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add Review in product
export const addReviewController = async (req, res) => {
  const { id } = req.params;
  const { name, email, rating, reviewTitle, reviewDescription } = req.body;

  try {
    const newReview = new reviewModel({
      name,
      email,
      rating,
      reviewTitle,
      reviewDescription,
    });

    const product = await Products.findById(id);
    if (!product) {
      console.log(`Product not found for ID: ${id}`);
      return res.status(404).json({ error: "Product not found" });
    }
    await newReview.save();
    console.log("Current average rating:", product.avrgrating);
    
    const oldrating = product.avrgrating;
    const newRating = rating;
    const averageRating = (newRating + oldrating) / 2;
    console.log("Current average rating:", averageRating);
    product.reviews.push(newReview);
    product.avrgrating = averageRating;
    await product.save();

    res
      .status(201)
      .json({ message: "Review saved successfully", review: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
