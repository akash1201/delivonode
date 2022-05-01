//import express from 'express';
const express = require("express");
// import {
// register,
// login
// } from "../controller/userController.js"
const {
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
  addtoCart,
  placeOrder,
} = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/newAddress", newAddress);
router.post("/addComplain", addComplain);
router.post("/addReview", addReview);
router.get("/myorders", myorders);
router.get("/myAddress", myAddress);
router.get(`/fetchBycategory/:categoryId`, protect, fetchBycategory);
router.get("/terms", terms);
router.get(`/fetchProducts/:vendorId/:categoryId`, protect, fetchProducts);
// router.post(`/addtoCart/:vendorId/:productId/:address`, protect, addtoCart);
router.post(`/placeOrder`, placeOrder);

module.exports = router;
