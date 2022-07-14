const asyncHandler = require("express-async-handler");
const Category = require("../models/Category.js");
const jwt = require("jsonwebtoken");
const Product = require("../models/Products.js");
const Store = require("../models/Store.js");

const addProduct = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ msg: "Authentication Failed" });
    }
    // Add here to look for category and then use the gst inside that to the product controller
    let category = await Category.findOne({
      subcategory: req.body.subcategory,
    });
    let obj = {
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      subcategory: req.body.subcategory,
      veg: req.body.veg || true,
      bestSeller: req.body.bestSeller || false,
      chefSpecial: req.body.chefSpecial || false,
      vendorId: storeid.id,
      gst: category.gstPercent,
      variable: req.body.variable,
    };
    // send price,qty,discount,unit,inStock as objects in variable array.
    let product = await Product.create(obj);
    res.status(200).json({ mess: "New product added by vendor" });
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
    let mycategory = await Category.findOne({
      parent: "null",
      subcategory: store.categories,
    });
    let category = await Category.find({ parent: mycategory._id });
    res.status(200).json({ mess: category });
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
      exists.variable = req.body.variable || exists.variable;
      exists.veg = req.body.veg || exists.veg;
      exists.bestSeller = req.body.bestSeller || exists.bestSeller;
      exists.chefSpecial = req.body.chefSpecial || exists.chefSpecial;
      await exists.save();
      res.status(200).json({ mess: "Product Updated" });
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
    return res.status(200).json({ mess: "Product Deleted" });
  } catch (error) {
    res.status(400).json({ error });
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
