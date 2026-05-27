const Wholesaler = require("../models/Wholesaler");

const addWholesaler = async (req, res) => {
  try {
    const { name, shopName, phone, email, address, city } = req.body;

    if (!name || !shopName || !phone || !address || !city) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const wholesaler = await Wholesaler.create({
      name,
      shopName,
      phone,
      email,
      address,
      city,
    });

    res.status(201).json({
      message: "Wholesaler added successfully",
      wholesaler,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getWholesalers = async (req, res) => {
  try {
    const wholesalers = await Wholesaler.find().sort({ createdAt: -1 });
    res.status(200).json(wholesalers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addWholesaler,
  getWholesalers,
};