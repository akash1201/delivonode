//import asyncHandler from 'express-async-handler';
const asyncHandler = require("express-async-handler");
//import User from '../models/user.js';
const user = require("../models/user.js");
//import generateToken from '../utils/generateToken.js';
const generateToken = require("../utils/generateToken.js");

const register = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const duplicate = await User.findOne({ email });
    if (duplicate) {
      return res
        .status(401)
        .json({ msg: "User already exists,please try to login" });
    }
    let user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

const login = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  const user = await User.findOne({ userName: email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      userType: user.userType,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

module.exports = { register, login };
