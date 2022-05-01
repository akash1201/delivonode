//import mongoose from "mongoose";
const mongoose = require("mongoose");
//import bcrypt from "bcryptjs";
const bcrypt = require("bcryptjs");

const AddressSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  addressType: { type: String, required: true },
  phoneNo: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String },
  city: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  //   longitude: { type: String, required: true },
  //   latitude: { type: String, required: true },
});

const Address = mongoose.model("Address", AddressSchema);
module.exports = Address;
