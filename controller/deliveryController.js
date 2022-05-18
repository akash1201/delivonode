//import asyncHandler from 'express-async-handler';
const asyncHandler = require("express-async-handler");
const Delivery = require("../models/Delivery.js");
const jwt = require("jsonwebtoken");
const Order = require("../models/Orders.js");
const generateToken = require("../utils/generateToken.js");

const register = asyncHandler(async (req, res) => {
  try {
    let { email } = req.body;
    let exists = await Delivery.findOne({ email: email });
    if (exists) {
      return res
        .status(500)
        .json({ msg: "User already exists,please try to login" });
    } else {
      let delivery = await Delivery.create(req.body);
      delivery.password = null;
      res.status(200).json({
        _id: delivery._id,
        token: generateToken(delivery._id),
        delivery: delivery,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Login
const login = asyncHandler(async (req, res) => {
  try {
    let { email, password } = req.body;
    const delivery = await Delivery.findOne({ email: email });
    if (!delivery) {
      return res.status(500).json("User not found");
    }
    if (await delivery.matchPassword(password)) {
      delivery.password = null;
      res.json({
        _id: delivery._id,
        token: generateToken(delivery._id),
        delivery,
      });
    } else {
      res.status(500).json({ message: `Password didn't match`, status: 500 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// Send Terms and Conditions
const terms = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let deliveryid = jwt.verify(token, process.env.JWT_SECRET);
    if (!deliveryid) {
      return res.status(500).json({ msg: "User not found" });
    }
    const delivery = await Delivery.find({ _id: deliveryid.id.toString() });
    // if (delivery.isApproved == false) {
    //   return res.status(500).json("Registeration approval pending by admin");
    // }
    let termsofuse =
      "lorem kwhfiuhwoilfc hfiuwk wehfiwehd wiehfkwenf wiehdfjkmd wehfuih fhirukhk ";
    let companypolicy =
      "jhbfwekfh,wekcbz,nmcbdkhfwuefgdjvb,mcnkjshdjc shgduilhilf ksdhfiuwhf shfuihwfc  kushfkjw";
    res.json({ termsofuse, companypolicy });
  } catch (error) {
    res.status(500).json({ status: 500, msg: error });
  }
});

// Go Offline
const goOffline = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let deliveryid = jwt.verify(token, process.env.JWT_SECRET);
    if (!deliveryid) {
      return res.status(500).json({ msg: "User not found" });
    }
    let delivery = await Delivery.findById(deliveryid.id);
    // if (delivery.isApproved == false) {
    //   return res.status(500).json("Registeration approval pending by admin");
    // }
    delivery.isAvailable = false;
    delivery.status = "Not Available";
    await delivery.save();
    res.status(200).json("Offline");
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});
// Assigned Order
const assigned = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let deliveryid = jwt.verify(token, process.env.JWT_SECRET);
    const delivery = await Delivery.findById(deliveryid.id);
    if ((delivery.isAvailable = false)) {
      let order = await Order.findOne({
        deliveryPartner: deliveryid.id,
        status: "Order Accepted",
      }).populate([
        {
          path: "vendorId",
          model: "Store",
          select: "_id storeName address",
        },
      ]);
      let deliveryaddress = order.address;
      let storeaddress = order.vendorId.address;
      let storename = order.vendorId.storeName;
      return res.status(200).json({ deliveryaddress, storeaddress, storename });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Marked as Accepted
const accepted = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let deliveryid = jwt.verify(token, process.env.JWT_SECRET);
    if (!deliveryid) {
      return res.status(500).json({ msg: "User not found" });
    }
    let delivery = await Delivery.findById(deliveryid.id);
    if ((delivery.isAvailable = false)) {
      let order = await Order.findOne({
        deliveryPartner: deliveryid.id,
        status: "Order Accepted",
      }).populate([
        {
          path: "vendorId",
          model: "Store",
          select: "_id storeName address",
        },
        {
          path: "products.productId",
          model: "Product",
          select: "_id price image qty unit name",
        },
      ]);
      delivery.status = "Accepted";
      delivery.orderReference = order._id;
      await delivery.save();
      order.status = "Pickup Arranged";
      let deliveryaddress = order.address;
      let storeaddress = order.vendorId.address;
      await order.save();
      let products = order.products;
      return res.status(200).json({ products, deliveryaddress, storeaddress });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});
// Marked as Picked
const picked = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let deliveryid = jwt.verify(token, process.env.JWT_SECRET);
    if (!deliveryid) {
      return res.status(500).json({ msg: "User not found" });
    }
    let delivery = await Delivery.findById(deliveryid.id);
    if ((delivery.isAvailable = false)) {
      let order = await Order.findOne({
        deliveryPartner: deliveryid.id,
        status: "Pickup Arranged",
      }).populate([
        {
          path: "vendorId",
          model: "Store",
          select: "_id storeName address",
        },
      ]);
      delivery.status = "Picked";
      await delivery.save();
      order.status = "Out for Delivery";
      await order.save();
      let deliveryaddress = order.address;
      let storeaddress = order.vendorId.address;
      return res.status(200).json({ deliveryaddress, storeaddress });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Marked as Delivered
const delivered = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let deliveryid = jwt.verify(token, process.env.JWT_SECRET);
    if (!deliveryid) {
      return res.status(500).json({ msg: "User not found" });
    }
    let delivery = await Delivery.findById(deliveryid.id);
    if ((delivery.isAvailable = false)) {
      let order = await Order.findOne({
        deliveryPartner: deliveryid.id,
        status: "Out for Delivery",
      });
      order.status = "Delivered";
      await order.save();
      delivery.status = "Delivered";
      delivery.isAvailable = true;
      await delivery.save();
      return res.status(200).json("Order Delivered");
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Current Delivery
const currDelivery = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let deliveryid = jwt.verify(token, process.env.JWT_SECRET);
    if (!deliveryid) {
      return res.status(500).json({ msg: "User not found" });
    }
    let delivery = await Delivery.findById(deliveryid.id);
    await delivery.save();
    return res.status(200).json("Order Delivered");
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Total Orders Delivered
const ordersDelivered = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let deliveryid = jwt.verify(token, process.env.JWT_SECRET);
    if (!deliveryid) {
      return res.status(500).json({ msg: "User not found" });
    }
    let delivery = await Delivery.findById(deliveryid.id);
    // if (delivery.isApproved == false) {
    //   return res.status(500).json("Registeration approval pending by admin");
    // }
    let orders = await Order.findOne({
      deliveryPartner: deliveryid.id,
      status: "Delivered",
    }).populate([
      {
        path: "products.productId",
        model: "Product",
        select: "_id price image qty unit name",
      },
    ]);
    let order = orders.length;
    res.status(200).json({ order, orders });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = {
  register,
  login,
  terms,
  accepted,
  picked,
  assigned,
  goOffline,
  ordersDelivered,
};
