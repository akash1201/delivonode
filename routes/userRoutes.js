//import express from 'express';
const express = require("express");
// import {
// register,
// login
// } from "../controller/userController.js"
const {
  reduceQuantity,
  fetchCategories,
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
  fetchStorebySubcategory,
  getsubCategory,
  addTip,
  addInstruction,
  // customDelivery,
  updateAddress,
  removeCoins,
  // prescriptionOrder,
  viewCoupon,
  fetchCouponStore,
  // placeCustomOrder,
  addFav,
  orderRating,
  removeFav,
  storeReviews,
  showFav,
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
router.post(`/addFav`, addFav);
router.get(`/showFav`, showFav);
router.post(`/removeFav`, removeFav);
router.post(`/storeReviews`, storeReviews);
router.post(`/viewCoupon`, viewCoupon);
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
router.get(`/getsubCategory/:vendorId`, getsubCategory);
router.post(`/addtoCart/:productid`, addtoCart);
router.post(`/reduceQuantity/:productid`, reduceQuantity);
router.get(`/viewCart`, viewCart);
router.post("/newAddress", newAddress);
router.post("/addComplain", addComplain);
router.put("/discardCart", discardCart);
router.post("/addReview", addReview);
router.get("/myorders", myorders);
router.post(`/updateAddress/:addressId`, updateAddress);
router.get(`/fetchCouponStore/:couponId`, fetchCouponStore);
router.get("/particularOrder/:orderId", particularOrder);
router.get("/myAddress", myAddress);
router.get(`/fetchBycategory/:categoryId`, protect, fetchBycategory);
router.get(
  `/fetchStorebySubcategory/:subcategoryId`,
  protect,
  fetchStorebySubcategory
);
router.get("/terms", terms);
router.get(`/fetchProducts/:vendorId/:subcategoryName`, protect, fetchProducts);
router.post(`/placeOrder`, placeOrder);

module.exports = router;
