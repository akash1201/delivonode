//import mongoose from 'mongoose';
const mongoose = require("mongoose");

const CouponsSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Coupons = mongoose.model("Coupons", CouponsSchema);
module.exports = Coupons;
