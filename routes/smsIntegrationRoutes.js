//import express from 'express';
const express= require('express');
//import {sendOtp} from '../controller/SmsIntegrationController.js';
const {sendOtp}= require('../controller/SmsIntegrationController.js');

const router = express.Router();

router.post(`/send-otp`, sendOtp);

export default router;