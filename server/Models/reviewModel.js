import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },
    reviewTitle: {
      type: String,
      required: [true, "Review title is required"],
    },
    reviewDescription: {
      type: String,
      required: [true, "Review description is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
