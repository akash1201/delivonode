//import express, { Router } from 'express';
const express = require("express");
//import {registerStore, login} from '../controller/StoreController.js';
const {
  registerStore,
  login,
  setStoreStatus,
  terms,
  support,
  showMap,
} = require("../controller/StoreController.js");
const { protect } = require("../middleware/authMiddleware.js");
const { sendmyOtp, verifymyOtp } = require("../controller/OtpVerify.js");

const router = express.Router();

router.post(`/register-store`, registerStore);
router.post(`/sendOtp`, sendmyOtp);
router.post(`/verifyOtp`, verifymyOtp);
router.post(`/login`, login);
router.get("/terms", terms);
router.post("/support", support);
router.put(`/set-status`, protect, setStoreStatus);
router.get("/showMap", showMap);

module.exports = router;
