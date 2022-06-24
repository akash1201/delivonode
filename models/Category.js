//import mongoose from 'mongoose';
const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  parent: {
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
  bgColor: {
    type: String,
    required: true,
  },
  hsnCode: {
    type: String,
    required: true,
  },
  gstPercent: {
    type: Number,
    required: true,
  },
  cashBack: {
    type: Number,
    required: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
