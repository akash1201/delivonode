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
    let products = await Product.find({
      vendorId: storeid.id,
      category: req.params.categoryName,
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
    let mycategory = store.categories;
    if (mycategory === "Vegetables & Fruits") {
      let subCategory = [
        "Green-Vegetable",
        "Summer-Fruits",
        "Winter-Vegetables",
        "Herbs",
      ];
      res.status(200).json({ subCategory });
    }
    if (mycategory === "Meat & Fish") {
      let subCategory = ["Latin-Fish", "Prawns"];
      res.status(200).json({ subCategory });
    }
    if (mycategory === "Pet Supplies") {
      let subCategory = ["Dog-Supplies", "Cat-Supplies", "Bones", "Belt"];
      res.status(200).json({ subCategory });
    }
    if (mycategory === "Pharma Medicines") {
      let subCategory = [
        "Vitamin-Supplements",
        "Bandages",
        "Energy-Drink",
        "Thyroid",
      ];
      res.status(200).json({ subCategory });
    }
    if (mycategory === "Food & Meals") {
      let subCategory = [
        "Chinese-Food",
        "Continental",
        "Thai",
        "Italian",
        "Indian",
      ];
      res.status(200).json({ subCategory });
    } else {
      res.status(500).json("Choose coorect category");
    }
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
    // const store = await Store.findById(storeid.id);
    // if (store.isApproved == false) {
    //   return res.status(500).json("Registeration approval pending by admin");
    // }
    // let product = await Product.findById(req.params.productId);
    await Product.deleteOne({ _id: req.params.productId.toString() });
    return res.status(200).json("Product Deleted");
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
});

module.exports = {
  addProduct,
  getProducts,
  getSubcategories,
  updateProduct,
  deleteProduct,
};
