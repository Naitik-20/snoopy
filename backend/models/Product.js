const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    thumbnail: {
  type: String,
},
images: [
  {
    type: String,
  },
],
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    retailPrice: {
      type: Number,
      required: true,
    },
    wholesalerPrice: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);