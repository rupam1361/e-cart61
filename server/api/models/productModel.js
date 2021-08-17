const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: String,
  },
  subCategory: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  productImage: {
    type: String,
  },
  tags: [],
});

module.exports = mongoose.model("product", productSchema);
