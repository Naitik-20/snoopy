const mongoose = require("mongoose");

const wholesalerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    shopName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wholesaler", wholesalerSchema);