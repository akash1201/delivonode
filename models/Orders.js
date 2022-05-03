//import mongoose from 'mongoose';
const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder.js");

// const Address = mongoose.Schema({
//   address1: { type: String, required: true },
//   address2: { type: String },
//   city: { type: String, required: true },
//   country: { type: String, required: true },
//   state: { type: String, required: true },
//   zip: { type: String, required: true },
//   // longitude: { type: String, required: true },
//   // latitude: { type: String, required: true },
// });

const OrderSchema = mongoose.Schema(
  {
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    vendorId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deliveryAgent: {
      type: String,
      required: true,
    },
    deliveryboyId: {
      type: String,
      required: true,
    },
    orderAccepted: {
      type: Boolean,
      default: false,
    },
    isPicked: {
      type: Boolean,
      default: false,
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
    isDeliveryAgentAssigned: {
      type: Boolean,
      default: false,
      required: true,
    },
    isUrgent: {
      type: Boolean,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    address: {
      type: Object,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
    },
  },

  { timestamps: true }
);

OrderSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  console.log(loc, "123456");
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  };
  next();
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
