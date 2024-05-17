import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
    unique: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;
