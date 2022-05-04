//import asyncHandler from 'express-async-handler';
const asyncHandler = require("express-async-handler");
//import Category from '../models/Category.js';
const Category = require("../models/Category.js");
//import jwt from 'jsonwebtoken';
const jwt = require("jsonwebtoken");
//import Product from '../models/Products.js';
const Product = require("../models/Products.js");
const Store = require("../models/Store.js");

const addCategory = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ msg: "Authentication Failed" });
    }
    const store = await Store.find({ _id: storeid.id.toString() });
    if (store.isApproved == false) {
      return res.status(500).json("Registeration approval pending by admin");
    }
    // let categoryexists = await Category.find({ name: req.body.name });

    // console.log(categoryexists);
    // if (categoryexists) {
    //   return res.status(500).json("Category Already Exists");
    // }
    let category = await Category.create(req.body);
    res.status(200).json("New category Added");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

const addProduct = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ msg: "Authentication Failed" });
    }
    const store = await Store.find({ _id: storeid.id.toString() });
    if (store.isApproved == false) {
      return res.status(500).json("Registeration approval pending by admin");
    }
    let obj = {
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      vendorId: storeid.id,
      price: req.body.price,
      qty: req.body.qty,
      unit: req.body.unit,
      discount: req.body.discount,
      inStock: req.body.inStock,
    };
    let product = await Product.create(obj);
    res.json("New Product Added");
  } catch (err) {
    res.json({ status: 500, msg: err });
  }
});

const getProducts = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ msg: "Authentication Failed" });
    }
    const store = await Store.find({ _id: storeid.id.toString() });
    if (store.isApproved == false) {
      return res.status(500).json("Registeration approval pending by admin");
    }
    let categoryId = req.params.categoryId;
    let products = await Product.find({
      vendorId: storeid.id,
      category: categoryId,
    });
    res.status(200).json({ products });
  } catch (err) {
    res.json({ status: 500, msg: err });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ msg: "Authentication Failed" });
    }
    const store = await Store.find({ _id: storeid.id.toString() });
    if (store.isApproved == false) {
      return res.status(500).json("Registeration approval pending by admin");
    }
    let exists = await Product.findById({ _id: req.params.productId });
    if (exists) {
      exists.name = req.body.name || exists.name;
      exists.price = req.body.price || exists.price;
      exists.qty = req.body.qty || exists.qty;
      exists.unit = req.body.unit || exists.unit;
      exists.discount = req.body.discount || exists.discount;
      exists.inStock = req.body.inStock || exists.inStock;
      let product = await exists.save();
      res.json("Product Updated");
    } else {
      res.status(404).json({ status: 404, msg: "Product not found" });
    }
  } catch (err) {
    res.json({ status: 500, msg: err.message });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ msg: "Authentication Failed" });
    }
    const store = await Store.find({ _id: storeid.id.toString() });
    if (store.isApproved == false) {
      return res.status(500).json("Registeration approval pending by admin");
    }
    let product = await Product.findById({ _id: req.params.productId });
    if (product) {
      await Product.deleteOne({ _id: req.params.productId });
      return res.status(200).json("Product Deleted");
    }
    res.status(404).json("Product not found");
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = {
  addCategory,
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
