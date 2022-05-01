//import express from 'express';
const express = require("express");
//import {protect} from '../middleware/authMiddleware.js';
const { protect } = require("../middleware/authMiddleware.js");

const {
  terms,
  addComplain,
  placeOrder,
  getOrders,
  orderDetails,
  getallorders,
  topselling,
  betweendates,
  walletAmount,
  fetchReviews,
  addReview,
} = require("../controller/orderController");

const router = express.Router();

router.post(`/placeorder`, protect, placeOrder);
// router.get(`/get-orders/:type/:pageNo?`, protect, getOrders);
// router.get(`/order-details/:orderId`, protect, orderDetails);
router.get(`/betweendates`, protect, betweendates);
router.get(`/topselling`, protect, topselling);
router.get(`/walletAmount`, protect, walletAmount);
router.get(`/fetchReviews`, protect, fetchReviews);
router.post(`/addReview`, protect, addReview);
router.get(`/getallorders`, protect, getallorders);
router.get(`/terms`, protect, terms);
router.post("/addComplain", protect, addComplain);

module.exports = router;
