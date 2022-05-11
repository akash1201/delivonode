//import express from 'express';
const express = require("express");
//import {addCategory, addProduct, getProducts, updateProduct, deleteProduct} from '../controller/ProductController.js'
const {
  addCategory,
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controller/ProductController.js");
//import { protect } from '../middleware/authMiddleware.js';
const { protect } = require("../middleware/authMiddleware.js");
const router = express.Router();

// router.post(`/add-category`, addCategory);
router.post(`/add-product`, protect, addProduct);
router.get(`/vendor/get-products/:categoryName`, protect, getProducts);
router.put(`/update-product/:productId`, protect, updateProduct);
router.delete(`/delete-product/:productId`, protect, deleteProduct);

module.exports = router;
