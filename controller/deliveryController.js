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
    if (delivery.isApproved == false) {
      return res.status(500).json("Registeration approval pending by admin");
    }
    let termsofuse =
      "lorem kwhfiuhwoilfc hfiuwk wehfiwehd wiehfkwenf wiehdfjkmd wehfuih fhirukhk ";
    let companypolicy =
      "jhbfwekfh,wekcbz,nmcbdkhfwuefgdjvb,mcnkjshdjc shgduilhilf ksdhfiuwhf shfuihwfc  kushfkjw";
    res.json({ termsofuse, companypolicy });
  } catch (error) {
    res.status(500).json({ status: 500, msg: error });
  }
});

// Assigned Order
const assigned = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let deliveryid = jwt.verify(token, process.env.JWT_SECRET);
    const delivery = await Delivery.findOne({ _id: deliveryid.id.toString() });
    if (delivery.isApproved == false) {
      return res.status(500).json("Registeration approval pending by admin");
    }
    if ((delivery.isAvailable = false)) {
      const order = await Order.findOne({
        _id: delivery.orderReference.toString(),
      });
      if ((order.orderAccepted = true)) {
        const location = order.location.coordinates;
        res.status(200).json({ order, location });
      }
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
    let delivery = await Delivery.findOne({ _id: deliveryid.id.toString() });
    if (delivery.isApproved == false) {
      return res.status(500).json("Registeration approval pending by admin");
    }
    let order = await Order.findOne({
      _id: delivery.orderReference.toString(),
    });
    delivery.isAvailable = false;
    await delivery.save();
    order.orderAccepted = true;
    await order.save();
    res.status(200).json("Order Accepted");
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
    let delivery = await Delivery.findOne({ _id: deliveryid.id.toString() });
    if (delivery.isApproved == false) {
      return res.status(500).json("Registeration approval pending by admin");
    }
    let order = await Order.findOne({
      _id: delivery.orderReference.toString(),
    });
    delivery.isPicked = true;
    await delivery.save();
    order.isPicked = true;
    await order.save();
    res.status(200).json("Order Picked");
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
    let delivery = await Delivery.findOne({ _id: deliveryid.id.toString() });
    if (delivery.isApproved == false) {
      return res.status(500).json("Registeration approval pending by admin");
    }
    let orders = await Order.find({ deliveryboyId: deliveryid.id.toString() });
    res.status(200).json({ order: orders.length() });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Send Location to display Map
const showMap = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let deliveryid = jwt.verify(token, process.env.JWT_SECRET);
    if (!deliveryid) {
      return res.status(500).json({ msg: "Authentication Failed" });
    }
    let delivery = await Delivery.findById(deliveryid.id);
    if (delivery.isApproved == false) {
      return res.status(500).json("Registeration approval pending by admin");
    }
    let location = store.location.coordinates;
    res.status(200).json({ location });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = {
  register,
  login,
  terms,
  accepted,
  picked,
  assigned,
  ordersDelivered,
};
