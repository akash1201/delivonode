//import asyncHandler from 'express-async-handler';
const asyncHandler = require("express-async-handler");
//import Store from '../models/Store.js';
const Store = require("../models/Store.js");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken.js");
const Complaints = require("../models/Complaints.js");

// Terms and Conditions
const terms = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ msg: "Authentication Failed" });
    }
    let termsofuse =
      "lorem kwhfiuhwoilfc hfiuwk wehfiwehd wiehfkwenf wiehdfjkmd wehfuih fhirukhk ";
    let companypolicy =
      "jhbfwekfh,wekcbz,nmcbdkhfwuefgdjvb,mcnkjshdjc shgduilhilf ksdhfiuwhf shfuihwfc  kushfkjw";
    res.json({ termsofuse, companypolicy });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Modify Packaging Charge
const packagingCharge = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ msg: "Authentication Failed" });
    }
    let store = await Store.findById(storeid.id);
    store.packagingCharge = req.body.packagingCharge;
    store.save();
    let mess = "Packaging Charges Modified";
    res.status(200).json({ mess });
  } catch (error) {}
});

// Send Location to display Map
const showMap = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ msg: "Authentication Failed" });
    }
    let store = await Store.findById(storeid.id);
    // if (store.isApproved == false) {
    //   return res.status(500).json("Registeration approval pending by admin");
    // }
    let location = store.location.coordinates;
    res.status(200).json({ location });
  } catch (error) {
    res.status(500).json({ error });
  }
});
// Support
const support = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ msg: "Authentication Failed" });
    }
    let store = await Store.findById(storeid.id);
    if (!store) {
      return res.status(500).json({ msg: "Store not Found" });
    }
    // if (store.isApproved == false) {
    //   return res.status(500).json("Registeration approval pending by admin");
    // }
    const complain = new Complaints({
      storeId: storeid.id,
      phoneNo: req.body.phoneNo,
      message: req.body.message,
    });
    await complain.save();
    res.status(200).json({ msg: "Complaint Registered" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// login
const login = asyncHandler(async (req, res) => {
  try {
    let { email, password } = req.body;
    const store = await Store.findOne({ email: email });
    if (!store) {
      return res.status(500).json("User not found");
    }
    if (await store.matchPassword(password)) {
      store.password = null;
      let categories = store.categories;
      res.json({
        _id: store._id,
        token: generateToken(store._id),
        categories,
      });
    } else {
      res.status(500).json({ message: `Password didn't match`, status: 500 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// register
const registerStore = asyncHandler(async (req, res) => {
  try {
    let { email, phoneNo } = req.body;
    let emailExists = await Store.findOne({ email: email });
    if (emailExists) {
      return res.status(500).json({ message: "Email already in use" });
    }
    let phoneExists = await Store.findOne({ phoneNo: phoneNo });
    if (phoneExists) {
      return res.status(500).json({ message: "PhoneNo already in use" });
    }
    let store = await Store.create(req.body);
    store.password = null;
    res.json({
      _id: store._id,
      token: generateToken(store._id),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const setStoreStatus = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    console.log(userid.id);

    await Store.updateOne({ _id: userid.id }, { active: req.body.status });
    res.json({ msg: "Updated" });
  } catch (err) {
    res.status(500).json({ status: 500, msg: err.msg });
  }
});

module.exports = {
  registerStore,
  login,
  setStoreStatus,
  terms,
  support,
  showMap,
  packagingCharge,
};
