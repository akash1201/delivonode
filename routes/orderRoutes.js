//import express from 'express';
const express= require('express');
//import {protect} from '../middleware/authMiddleware.js';
const {protect}= require('../middleware/authMiddleware.js');
import {
  placeOrder
} from '../controller/orderController.js'

const router = express.Router();

router.post(`/place-order`, protect, placeOrder);

export default router;