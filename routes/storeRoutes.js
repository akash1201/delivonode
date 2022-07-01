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
  goOffline,
  goOnline,
  addtoMenu,
  removefromMenu,
  packagingCharge,
  updateStation,
  createCoupons,
  deleteCoupons,
  viewAdminCoupon,
  showMenu,
  addCoupon,
  viewCoupon,
} = require("../controller/StoreController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post(`/register-store`, registerStore);

router.post(`/login`, login);
router.get(`/showMenu`, showMenu);
router.post(`/packagingCharge`, packagingCharge);
router.post(`/updateStation`, updateStation);
router.get(`/viewAdminCoupon`, viewAdminCoupon);
router.post(`/addtoMenu`, addtoMenu);
router.post(`/removefromMenu`, removefromMenu);
router.get(`/viewCoupon`, viewCoupon);
router.put(`/goOnline`, goOnline);
router.post(`/deleteCoupons`, deleteCoupons);
router.put(`/goOffline`, goOffline);
router.post(`/addCoupon`, addCoupon);
router.post(`/createCoupons`, createCoupons);
router.get("/terms", terms);
router.post("/support", support);
router.put(`/set-status`, protect, setStoreStatus);
router.get("/showMap", showMap);

module.exports = router;
