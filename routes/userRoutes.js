//import express from 'express';
const express = require("express");
// import {
// register,
// login
// } from "../controller/userController.js"
const {
  fetchCategories,
  payment,
  fetchsubCategories,
  fetchCoupons,
  addtoCart,
  viewCart,
  discardCart,
  particularOrder,
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
  wallet,
  myaccount,
  addPrescription,
} = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware.js");
const { signNewsletter } = require("../controller/NewsController.js");
const {
  sendmyOtp,
  sendEmail,
  verifymyOtp,
} = require("../controller/OtpVerify.js");
const router = express.Router();

router.post("/register", register);
router.post("/payment", payment);
router.post("/addPrescription", addPrescription);
router.post("/sendmyOtp", sendmyOtp);
router.post("/sendEmail", sendEmail);
router.post("/verifymyOtp", verifymyOtp);
router.post("/signNewsletter", signNewsletter);
router.post("/login", login);
router.get(`/fetchCoupons`, fetchCoupons);
router.get(`/fetchCategories`, fetchCategories);
router.get(`/wallet`, wallet);
router.get(`/myaccount`, myaccount);
router.get(`/fetchsubCategories/:categoryId`, fetchsubCategories);
router.post(`/addtoCart/:productid`, addtoCart);
router.get(`/viewCart`, viewCart);
router.post("/newAddress", newAddress);
router.post("/addComplain", addComplain);
router.put("/discardCart", discardCart);
router.post("/addReview", addReview);
router.get("/myorders", myorders);
router.get("/particularOrder/:orderId", particularOrder);
router.get("/myAddress", myAddress);
router.get(`/fetchBycategory/:categoryId`, protect, fetchBycategory);
router.get("/terms", terms);
router.get(`/fetchProducts/:vendorId/:subcategoryName`, protect, fetchProducts);
router.post(`/placeOrder`, placeOrder);
router.post(`/payment`, payment);

module.exports = router;
