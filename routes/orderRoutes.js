//import express from 'express';
const express = require("express");
//import {protect} from '../middleware/authMiddleware.js';
const { protect } = require("../middleware/authMiddleware.js");

const {
  getOrders,
  orderDetails,
  getallorders,
  topselling,
  betweendates,
  walletAmount,
  fetchReviews,
} = require("../controller/orderController");

const router = express.Router();

// router.get(`/get-orders/:type/:pageNo?`, protect, getOrders);
// router.get(`/order-details/:orderId`, protect, orderDetails);
router.get(`/betweendates`, protect, betweendates);
router.get(`/topselling`, protect, topselling);
router.get(`/walletAmount`, protect, walletAmount);
router.get(`/fetchReviews`, protect, fetchReviews);
router.get(`/getallorders`, protect, getallorders);

module.exports = router;
