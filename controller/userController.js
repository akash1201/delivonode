//import asyncHandler from 'express-async-handler';
const asyncHandler = require("express-async-handler");
const User = require("../models/User.js");
const Address = require("../models/Address.js");
const Complaints = require("../models/Complaints");
const Reviews = require("../models/Reviews");
const generateToken = require("../utils/generateToken.js");
const jwt = require("jsonwebtoken");
const Order = require("../models/Orders.js");
const Delivery = require("../models/Delivery.js");
const Store = require("../models/Store.js");
const Product = require("../models/Products.js");

// Register
const register = asyncHandler(async (req, res) => {
  try {
    let { email } = req.body;
    let duplicate = await User.findOne({ email: email });
    if (duplicate) {
      return res
        .status(500)
        .json({ msg: "User already exists,please try to login" });
    } else {
      let user = await User.create(req.body);
      console.log(user);
      // Adding an address simultaneously while creating user.
      let address = await Address.create({
        userId: user._id,
        addressType: "Home",
        phoneNo: user.phoneNo,
        address1: user.address.address1,
        address2: user.address.address2,
        city: user.address.city,
        country: user.address.country,
        zip: user.address.zip,
        state: user.address.state,
      });
      res.json({
        _id: user._id,
        token: generateToken(user._id),
        user: user,
        address: address,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Login
const login = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    if (await user.matchPassword(password)) {
      res.json({
        _id: user._id,
        token: generateToken(user._id),
        user: user,
      });
    } else {
      res.status(500).json({ message: `Password didn't match`, status: 500 });
    }
  } else {
    res.status(404).json({ message: "Email Not Found", status: 404 });
  }
});

// Add new Address
const newAddress = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);

    let address = await Address.create({
      userId: userid.id,
      ...req.body,
    });
    res.json({ status: 200, address });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});
// My-Address
const myAddress = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    const myaddress = await Address.find({ userId: userid.id.toString() });
    res.json({ status: 200, myaddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Send Terms and Conditions
const terms = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.status(500).json({ msg: "User not found" });
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

// Add Complain
const addComplain = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.status(500).json({ msg: "Authentication Failed" });
    }
    let obj = {
      message: req.body.message,
      storeId: userid.id,
      phoneNo: req.body.phoneNo,
    };

    let complain = await Complaints.create(obj);
    res.status(200).json({ complain });
  } catch (err) {
    console.log(err);
    res.json({ status: 500, msg: err.message });
  }
});

// Add Review to Order (Post req)
const addReview = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.json({ msg: "User not found" });
    }
    const newReview = new Reviews({
      userId: userid.id,
      vendorId: req.body.vendorId,
      rating: req.body.rating,
      comment: req.body.comment,
    });
    res.status(200).json({ msg: "Added Review", newReview });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

// myorders
const myorders = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.json({ msg: "User not found" });
    }
    const orders = await Order.find({ userId: userid.id.toString() }).populate([
      {
        path: "products.productId",
        model: "Product",
        select: "_id name",
      },
    ]);
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

// Order placing Customer End (Post req)
const placeOrder = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: userid.id });
    if (!user) {
      return res.status(500).json({ status: 500, msg: "User not Found" });
    }
    let obj = {
      userId: userid.id,
      ...req.body,
    };
    const newOrder = new Order(obj);
    const delivery = await Delivery.find({ isAvailable: true });
    let item = Math.floor(Math.random() * delivery.length);
    console.log(delivery[item]);
    newOrder.deliveryAgent = delivery[item].name;
    newOrder.isDeliveryAgentAssigned = true;
    newOrder.deliveryboyId = delivery[item]._id.toString();
    delivery[item].orderReference = newOrder._id.toString();
    await delivery[item].save();
    await newOrder.save();
    res.status(200).json({ msg: "Order Placed Successfully", newOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, msg: error });
  }
});

// Fetch By category
const fetchBycategory = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.json("Login to continue");
    }
    // let categoryId: req.params.categoryId;
    let options = await Store.find({ categories: req.params.categoryId });
    res.status(200).json({ options });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

// Fetch Products based on store and category
const fetchProducts = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.json("Login to continue");
    }
    let options = await Product.find({
      vendorId: req.params.vendorId,
      category: req.params.categoryId,
    });
    res.status(200).json({ options });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = {
  register,
  login,
  newAddress,
  terms,
  addComplain,
  addReview,
  myorders,
  myAddress,
  fetchBycategory,
  fetchProducts,
  placeOrder,
};
