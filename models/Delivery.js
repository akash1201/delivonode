//import mongoose from "mongoose";
const mongoose = require("mongoose");
//import bcrypt from "bcryptjs";
const bcrypt = require("bcryptjs");

const deliverySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    password: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isPicked: {
      type: Boolean,
      default: false,
    },
    orderReference: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

deliverySchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

deliverySchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;