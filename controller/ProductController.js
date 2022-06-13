//import asyncHandler from 'express-async-handler';
const asyncHandler = require("express-async-handler");
//import Category from '../models/Category.js';
const Category = require("../models/Category.js");
//import jwt from 'jsonwebtoken';
const jwt = require("jsonwebtoken");
// const upload = require("../routes/uploadRoute.js");
//import Product from '../models/Products.js';
const Product = require("../models/Products.js");
const Store = require("../models/Store.js");

const addProduct = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ msg: "Authentication Failed" });
    }
    let obj = {
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      subcategory: req.body.subcategory,
      vendorId: storeid.id,
      price: req.body.price,
      qty: req.body.qty,
      unit: req.body.unit,
      discount: req.body.discount,
    };
    let product = await Product.create(obj);
    res.status(200).json({ product });
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
    // let store = await Store.findById(storeid.id);
    // let mycategory = await Category.find({
    //   parent: "null",
    //   subcategory: store.categories,
    // });
    let products = await Product.find({
      vendorId: storeid.id,
      subcategory: req.params.subcategoryName,
    });
    res.status(200).json({ products });
  } catch (err) {
    res.json({ status: 500, msg: err });
  }
});
const getSubcategories = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ msg: "Authentication Failed" });
    }
    let store = await Store.findById(storeid.id);
    console.log(store);
    let mycategory = await Category.findOne({
      parent: "null",
      subcategory: store.categories,
    });
    let category = await Category.find({ parent: mycategory._id });
    res.status(200).json({ category });
  } catch (err) {
    res.json({ status: 500, msg: err });
  }
});

const mysubcategory = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ msg: "Authentication Failed" });
    }

    const storesubcategory = await Product.distinct("subcategory", {
      vendorId: storeid.id,
    });
    res.status(200).json({ storesubcategory });
  } catch (error) {
    res.status(500).json({ error });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ msg: "Authentication Failed" });
    }
    // const store = await Store.find({ _id: storeid.id.toString() });
    // if (store.isApproved == false) {
    //   return res.status(500).json("Registeration approval pending by admin");
    // }
    let exists = await Product.findById(req.params.productId);
    if (exists) {
      exists.name = req.body.name || exists.name;
      exists.price = req.body.price || exists.price;
      exists.qty = req.body.qty || exists.qty;
      exists.unit = req.body.unit || exists.unit;
      exists.discount = req.body.discount || exists.discount;
      exists.inStock = req.body.inStock || exists.inStock;
      await exists.save();
      res.status(200).json("Product Updated");
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
    await Product.deleteOne({ _id: req.params.productId });
    return res.status(200).json("Product Deleted");
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
});

module.exports = {
  mysubcategory,
  addProduct,
  getProducts,
  getSubcategories,
  updateProduct,
  deleteProduct,
};
