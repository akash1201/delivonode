//import mongoose from 'mongoose';
const mongoose = require("mongoose");

const CouponsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  backgroundColor: {
    type: Array,
    // Create array of colors
  },
  image: {
    type: String,
    required: true,
  },
});

const Coupons = mongoose.model("Coupons", CouponsSchema);
module.exports = Coupons;
