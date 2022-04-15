//import mongoose from 'mongoose';
const mongoose = require("mongoose");

const ComplaintsSchema = mongoose.Schema({
  store: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Complaints = mongoose.model("Complaints", ComplaintsSchema);
module.exports = Complaints;
