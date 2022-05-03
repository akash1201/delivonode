//import express, { Router } from 'express';
const express = require("express");
//import {registerStore, login} from '../controller/StoreController.js';
const {
  registerStore,
  login,
  setStoreStatus,
  terms,
  support,
} = require("../controller/StoreController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post(`/register-store`, registerStore);
router.post(`/login`, login);
router.get("/terms", terms);
router.post("/support", support);
router.put(`/set-status`, protect, setStoreStatus);

module.exports = router;
