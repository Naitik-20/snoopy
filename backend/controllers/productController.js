const Product = require("../models/Product");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      retailPrice,
      wholesalerPrice,
      stock,
      description,
    } = req.body;

    if (!name || !category || !retailPrice || !wholesalerPrice) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }
 const thumbnail = req.files?.thumbnail?.[0]
  ? `/uploads/${req.files.thumbnail[0].filename}`
  : "";

const images = req.files?.images
  ? req.files.images.map((file) => `/uploads/${file.filename}`)
  : [];
    const product = await Product.create({
        thumbnail,
       images,
      name,
      category,
      retailPrice,
      wholesalerPrice,
      stock,
      description,
    });

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
};