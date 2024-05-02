import Mongoose from "mongoose";
import reviewModel from "./reviewModel.js";
// import categoryModel from "./categoryModel";

const productSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    salePrice: {
      type: Number,
    },
    avrgrating: {
      type: Number,
      default:5,
    },
    stock: {
      type: String,
      required: [true, "Product stock is required"],
      enum: ["In stock", "Out of stock"],
      default: "In stock",
    },
    reviews: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    size: {
      type: String,
      // enum: ["XL", "L", "M", "S"],
    },
    colors: {
      type: [String],
    },
    sku: {
      type: String,
      unique: true,
    },
    category: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    images: [{ type: String }],
  },
  { timestamps: true }
);

const Products = Mongoose.model("Products", productSchema);

export default Products;
