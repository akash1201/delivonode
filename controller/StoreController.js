//import asyncHandler from 'express-async-handler';
const asyncHandler = require("express-async-handler");
//import Store from '../models/Store.js';
const Store = require("../models/Store.js");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken.js");
const Complaints = require("../models/Complaints.js");

// Terms and Conditions
const terms = asyncHandler(async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let storeid = jwt.verify(token, process.env.JWT_SECRET);
  if (!storeid) {
    return res.status(500).json({ msg: "Authentication Failed" });
  }
  let conditions = "lorem";
  res.json({ msg: conditions });
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
      return res.status(500).json({ msg: "Store not Found Failed" });
    }
    const complain = new Complaints({
      store: storeid.id,
      phoneNo: store.phoneNo,
      message: req.body,
    });
    await complain.save();
    res.status(200).json({ msg: "Complaint Registered" });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

const login = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  const store = await Store.findOne({ email: email });
  if (store) {
    if (await store.matchPassword(password)) {
      res.json({
        _id: store._id,
        token: generateToken(store._id),
        store,
      });
    } else {
      res.status(500).json({ message: `Password didn't match`, status: 500 });
    }
  } else {
    res.status(404).json({ message: "Email Not Found", status: 404 });
  }
});

const registerStore = asyncHandler(async (req, res) => {
  try {
    let { email } = req.body;
    console.log(req.body);

    let emailExists = await Store.findOne({ email: email });
    if (emailExists) {
      res.status(500).json({ message: "Email already in use" });
    } else {
      let store = await Store.create(req.body);
      console.log(store);
      res.json({
        _id: store._id,
        token: generateToken(store._id),
        store,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
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

module.exports = { registerStore, login, setStoreStatus };
