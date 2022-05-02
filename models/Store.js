//import mongoose from "mongoose";
const mongoose = require("mongoose");
//import bcrypt from "bcryptjs";
const bcrypt = require("bcryptjs");

const Address = mongoose.Schema({
  address1: { type: String, required: true },
  address2: { type: String },
  city: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true, maxlength: 6, minlength: 6 },
});

const StoreSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  storeName: { type: String, required: true },
  phoneNo: { type: String, required: true, unique: true, minlength: 10 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },

  address: Address,

  liscenseNo: {
    type: String,
    required: true,
    index: true,
    unique: true,
    sparse: true,
  },
  gst: { type: String, minlength: 15, unique: true, required: false },
  ownerAadhar: { type: String, required: true, unique: true, minlength: 12 },
  ownerPan: { type: String, required: true, unique: true, minlength: 10 },
  bankName: { type: String, required: true },
  accountHolder: { type: String, required: true },
  accountNo: { type: Number, required: true },
  ifsc: { type: String, required: true },
  vendorType: { type: String, default: "normal" },
  upiId: { type: String, unique: true, required: false },
  storeManager: { type: String, required: true },
  whatsappUpdate: { type: Boolean, required: true },
  //
  categories: { type: String, required: true },
  services: { type: String, required: true },
  active: { type: Boolean, default: true },
  document: { type: Buffer, contentType: String, required: true },
  cancelledCheque: { type: Buffer, contentType: String, required: true },
  uploadAadharfront: { type: Buffer, contentType: String, required: true },
  // uploadIds: { type: Buffer, contentType: String, required: false },
  // uploadAadharback: { type: Buffer, contentType: String, required: true },
  // uploadGSTcertificate: { type: Buffer, contentType: String, required: false },
  // uploadPan: { type: Buffer, contentType: String, required: true },

  // longitude: { type: String, required: true },
  // latitude: { type: String, required: true },
});

StoreSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

StoreSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Store = mongoose.model("Store", StoreSchema);
module.exports = Store;
