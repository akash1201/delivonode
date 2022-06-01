//import mongoose from 'mongoose';
const mongoose = require("mongoose");

const PrescriptionSchema = mongoose.Schema({
  vendorId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  DrName: {
    type: String,
    required: true,
  },
  urgent: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const Prescription = mongoose.model("Prescription", PrescriptionSchema);
module.exports = Prescription;
