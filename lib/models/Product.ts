import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    price: {
      type: mongoose.Schema.Types.Decimal128,
      get: (v: mongoose.Schema.Types.Decimal128) => {
        return parseFloat(v.toString());
      },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { toJSON: { getters: true } }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
