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
  viewCart,
  addNew,
  cancelOrder,
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
  updateAddress,
  removeCoins,
  prescriptionOrder,
  viewCoupon,
  fetchCouponStore,
  addFav,
  orderRating,
  customDelivery,
  assignCustomDelivery,
  removeFav,
  storeReviews,
  showFav,
  changePassword,
  sendLink,
  resetLink,
  viewProduct,
} = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware.js");

const { sendmyOtp, verifymyOtp } = require("../controller/OtpVerify.js");
const router = express.Router();

router.post("/register", register);
router.put(`/removeCoins`, removeCoins);
router.post(`/changePassword`, changePassword);
router.post(`/sendLink`, sendLink);
router.post(`/resetLink/:tokenId`, resetLink);
router.post(`/addInstruction/:orderId`, addInstruction);
router.post(`/addTip/:orderId`, addTip);
router.post(`/orderRating`, orderRating);
router.post(`/addFav`, addFav);
router.get(`/showFav`, showFav);
router.post(`/removeFav`, removeFav);
router.post(`/storeReviews`, storeReviews);
router.post(`/viewCoupon`, viewCoupon);
router.post("/addPrescription", addPrescription);
router.post("/sendmyOtp", sendmyOtp);
router.post("/verifymyOtp", verifymyOtp);
router.post(`/viewProduct`, viewProduct);

router.post("/login", login);
router.get(`/fetchCoupons`, fetchCoupons);
router.get(`/fetchCategories`, fetchCategories);
router.get(`/wallet`, wallet);
router.get(`/myaccount`, myaccount);
router.get(`/fetchsubCategories/:categoryId`, fetchsubCategories);
router.get(`/getsubCategory/:vendorId`, getsubCategory);
router.post(`/addNew/:productid`, addNew);
router.post(`/reduceQuantity/:productid`, reduceQuantity);
router.get(`/viewCart`, viewCart);
router.post("/newAddress", newAddress);
router.post("/addComplain", addComplain);
router.put("/discardCart", discardCart);
router.post("/addReview", addReview);
router.get("/myorders", myorders);
router.post(`/cancelOrder/:orderId`, cancelOrder);
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
router.post(`/customDelivery`, customDelivery);
router.post(`/prescriptionOrder`, prescriptionOrder);
router.post(`/assignCustomDelivery/:orderId`, assignCustomDelivery);

module.exports = router;
