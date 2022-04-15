//import mongoose from 'mongoose';
const mongoose = require("mongoose");

const Address = mongoose.Schema({
  phoneNo: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String },
  city: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  longitude: { type: String, required: true },
  latitude: { type: String, required: true },
});

const OrderSchema = mongoose.Schema(
  {
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        vendorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Store",
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    deliveryAgent: {
      type: String,
      required: true,
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
    isDeliveryAgentAssigned: {
      type: Boolean,
      default: false,
    },
    isUrgent: {
      type: Boolean,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    address: Address,
    // latitude: {
    //   type: String,
    //   required: true,
    // },
    // longitude: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
