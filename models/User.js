//import mongoose from "mongoose";
const mongoose = require("mongoose");
//import bcrypt from "bcryptjs";
const bcrypt = require("bcryptjs");

const geocoder = require("../utils/geocoder.js");
const Address = mongoose.Schema({
  address1: { type: String, required: true },
  address2: { type: String },
  city: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
});

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNo: {
      type: Number,
      required: true,
      unique: true,
    },
    address: Address,
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
