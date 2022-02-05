import express from 'express';
import {sendOtp} from '../controller/SmsIntegrationController.js';

const router = express.Router();

router.post(`/send-otp`, sendOtp);

export default router;