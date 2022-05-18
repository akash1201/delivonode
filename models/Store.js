//import mongoose from "mongoose";
const mongoose = require("mongoose");
//import bcrypt from "bcryptjs";
const bcrypt = require("bcryptjs");
const geocoder = require("../utils/geocoder.js");
// const { NumberContext } = require("twilio/lib/rest/pricing/v2/voice/number");

const Address = mongoose.Schema({
  streetName: { type: String, required: true },
  streetNumber: { type: String },
  city: { type: String, required: true },
  countryCode: { type: String, required: true },
  stateCode: { type: String, required: true },
  zipcode: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
});

const StoreSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  storeName: { type: String, required: true },
  phoneNo: { type: String, required: true, minlength: 10 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  address: Address,
  isApproved: {
    type: Boolean,
    default: false,
  },
  liscenseNo: {
    type: Number,
    required: true,
  },
  openingTime: {
    type: String,
    required: true,
  },
  closingTime: {
    type: String,
    required: true,
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
  categories: { type: String, required: true },
  services: { type: String, required: true },
  active: { type: Boolean, default: true },
  cancelledCheque: { type: String, required: true },
  uploadAadharfront: { type: String, required: true },
  uploadMenu: { type: String, required: true },
  uploadAadharback: { type: String, required: true },
  uploadGSTcertificate: { type: String, required: true },
  uploadPan: { type: String, required: true },
  terms: { type: Boolean, default: true },
  policy: { type: Boolean, default: true },
  // uploadAadharfront: { type: Buffer, contentType: String, required: true },
  // uploadIds: { type: Buffer, contentType: String, required: false },
  // uploadAadharback: { type: Buffer, contentType: String, required: true },
  // uploadGSTcertificate: { type: Buffer, contentType: String, required: false },
  // uploadPan: { type: Buffer, contentType: String, required: true },
  
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
  // const loc = await geocoder.geocode(this.address);
  // console.log(loc, "123456");
  // this.location = {
  //   type: "Point",
  //   coordinates: [loc[0].longitude, loc[0].latitude],
  //   formattedAddress: loc[0].formattedAddress,
  // };
  next();
});

const Store = mongoose.model("Store", StoreSchema);
module.exports = Store;
