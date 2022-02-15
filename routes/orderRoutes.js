//import express from 'express';
const express= require('express');
//import {protect} from '../middleware/authMiddleware.js';
const {protect}= require('../middleware/authMiddleware.js');

const { placeOrder, getOrders, orderDetails } = require ('../controller/orderController');

const router = express.Router();

router.post(`/place-order`, protect, placeOrder);
router.get(`/get-orders/:type/:pageNo?`, protect, getOrders);
router.get(`/order-details/:orderId`, protect, orderDetails);

module.exports = router;