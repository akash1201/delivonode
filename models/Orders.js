//import mongoose from 'mongoose';
const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder.js");

const OrderSchema = mongoose.Schema(
  {
    products: {
      type: Array,
      required: true,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Total: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      required: true,
    },
    statusId: {
      type: String,
      required: true,
    },
    instruction: {
      type: String,
    },
    deliveryPartner: {
      type: String,
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
