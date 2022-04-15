//import mongoose from 'mongoose';
const mongoose = require("mongoose");

const ReviewsSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Reviews = mongoose.model("Reviews", ReviewsSchema);
module.exports = Reviews;
