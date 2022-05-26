//import mongoose from 'mongoose';
const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  categoryId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
