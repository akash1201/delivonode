//import asyncHandler from 'express-async-handler';
const asyncHandler = require("express-async-handler");
const User = require("../models/User.js");
const Address = require("../models/Address.js");
const Complaints = require("../models/Complaints");
const Reviews = require("../models/Reviews");
const generateToken = require("../utils/generateToken.js");
const jwt = require("jsonwebtoken");
const Order = require("../models/Orders.js");
const Delivery = require("../models/Delivery.js");
const Store = require("../models/Store.js");
const Category = require("../models/Category.js");
const Product = require("../models/Products.js");
const Coupons = require("../models/Coupons.js");
const Cart = require("../models/Cart.js");
const Prescription = require("../models/Prescription.js");
const axios = require("axios");
const sdk = require("api")("@cashfreedocs-new/v2#97f8kl3sscv9e");
// const PaymentGateway = require("@cashfreepayments/cashfree-sdk");

// Register
const register = asyncHandler(async (req, res) => {
  try {
    let { email } = req.body;
    let duplicate = await User.findOne({ email: email });
    console.log(duplicate, "4");
    if (duplicate) {
      return res
        .status(500)
        .json({ msg: "User already exists,please try to login" });
    } else {
      console.log("12");
      let user = await User.create(req.body);
      console.log(user, "1555");
      // Adding an address simultaneously while creating user.
      let obj = {
        userId: user._id.toString(),
        addressType: "Home",
        streetName: user.address.streetName,
        streetNumber: user.address.streetNumber,
        city: user.address.city,
        countryCode: user.address.countryCode,
        zipcode: user.address.zipcode,
        stateCode: user.address.stateCode,
      };

      let addressss = await Address.create(obj);
      user.password = null;
      res.json({
        _id: user._id,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Login
const login = asyncHandler(async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(500).json("User not found");
    }
    if (await user.matchPassword(password)) {
      user.password = null;
      res.json({
        _id: user._id,
        token: generateToken(user._id),
        user,
      });
    } else {
      res.status(500).json({ message: `Password didn't match`, status: 500 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// add Prescription
const addPrescription = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.status(500).json({ msg: "User not found" });
    }
    let obj = {
      userId: userid.id,
      ...req.body,
    };
    const prescription = await Prescription.create(obj);
    res.status(200).json("Prescription added ");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Add new Address
const newAddress = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);

    let address = await Address.create({
      userId: userid.id,
      ...req.body,
    });
    res.status(200).json({ address });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});
// My-Address
const myAddress = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    const myaddress = await Address.find({ userId: userid.id });
    res.status(200).json({ myaddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Send Terms and Conditions
const terms = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.status(500).json({ msg: "User not found" });
    }
    let termsofuse =
      "lorem kwhfiuhwoilfc hfiuwk wehfiwehd wiehfkwenf wiehdfjkmd wehfuih fhirukhk ";
    let companypolicy =
      "jhbfwekfh,wekcbz,nmcbdkhfwuefgdjvb,mcnkjshdjc shgduilhilf ksdhfiuwhf shfuihwfc  kushfkjw";
    res.json({ termsofuse, companypolicy });
  } catch (error) {
    res.status(500).json({ status: 500, msg: error });
  }
});
const wallet = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.status(500).json({ msg: "User not found" });
    }
    const orders = await Order.find({ userId: userid.id, status: "Delivered" });
    res.json({ availableBalance: "$ 114", orders });
  } catch (error) {
    res.status(500).json({ status: 500, msg: error });
  }
});
const myaccount = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.status(500).json({ msg: "User not found" });
    }
    const user = await User.findById(userid.id);
    res.json({ user });
  } catch (error) {
    res.status(500).json({ status: 500, msg: error });
  }
});

// Add Complain
const addComplain = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.status(500).json({ msg: "Authentication Failed" });
    }
    let obj = {
      message: req.body.message,
      storeId: userid.id,
      phoneNo: req.body.phoneNo,
    };

    let complain = await Complaints.create(obj);
    res.status(200).json({ msg: "Complaint Registered" });
  } catch (err) {
    console.log(err);
    res.json({ status: 500, msg: err.message });
  }
});

// Add Review to Order (Post req)
const addReview = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.json("User not found");
    }
    console.log(userid.id);
    let obj = {
      userId: userid.id,
      vendorId: req.body.vendorId,
      rating: req.body.rating,
      comment: req.body.comment,
    };
    let newReview = await Reviews.create(obj);
    res.status(200).json("New Review Added");
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

// myorders
const myorders = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.json({ msg: "User not found" });
    }
    const orders = await Order.find({ userId: userid.id.toString() }).populate([
      {
        path: "vendorId",
        model: "Store",
        select:
          "_id categories storeName storeImage address lattitude longitude",
      },
      {
        path: "userId",
        model: "User",
        select: "_id name lastName",
      },
      {
        path: "deliveryPartner",
        model: "Delivery",
        select: "_id name",
      },
    ]);
    res.status(200).json({ orders, date: "20 June", time: "11:35 am" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Particular Order Info
const particularOrder = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.json({ msg: "User not found" });
    }
    const order = await Order.findById(req.params.orderId).populate([
      {
        path: "products.productId",
        model: "Product",
        select: "_id price image qty unit name",
      },
    ]);
    console.log(order);
    let totalItems = 0;
    order.products.forEach((ele) => (totalItems += ele.quantity));
    const products = order.products;
    const Total = order.Total;
    const subTotal = (Total * 100) / 115;
    const serviceFee = (Total * 15) / 115;

    res.status(200).json({ products, Total, subTotal, serviceFee, totalItems });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Order placing Customer End (Post req)
const placeOrder = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userid.id);
    if (!user) {
      return res.status(500).json({ status: 500, msg: "User not Found" });
    }
    let cart = await Cart.findOne({
      userId: userid.id,
      status: "shopping",
    });
    let subTotal = 0;
    cart.products.forEach((ele) => (subTotal += ele.price));
    const serviceFee = (subTotal / 100) * 15;
    const Total = subTotal + serviceFee;

    cart.status = "Order Placed";
    await cart.save();
    let orderaddress = await Address.findOne({ _id: req.body.addressId });

    let obj = {
      userId: userid.id,
      products: cart.products,
      vendorId: cart.vendorId,
      status: "Order Placed",
      Total: Total,
      address: orderaddress,
      statusId: "41524123",
    };
    const newOrder = await Order.create(obj);
    await cart.save();
    res.status(200).json("Order Placed Successfully");
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Add First Product to Cart
const addtoCart = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: userid.id.toString() });
    if (!user) {
      return res.status(500).json({ status: 500, msg: "User not Found" });
    }
    const cartexists = await Cart.find({
      userId: userid.id.toString(),
      status: "shopping",
    }).populate([
      {
        path: "products.productId",
        model: "Product",
        select: "_id vendorId",
      },
    ]);
    // console.log(cartexists[0].products, "27");
    if (cartexists.length > 0) {
      const currProduct = await Product.findById(req.params.productid);

      if (
        currProduct.vendorId === cartexists[0].products[0].productId.vendorId
      ) {
        const productalready = cartexists[0].products.findIndex(
          (ele) => ele.productId._id.toString() === req.params.productid
        );
        if (productalready > -1) {
          const cartid = cartexists[0]._id;
          const ourcart = await Cart.findById(cartid);
          ourcart.products[productalready].quantity += 1;
          ourcart.products[productalready].price =
            currProduct.price * ourcart.products[productalready].quantity;
          await ourcart.save();
          return res.status(200).json("Product Quantity Increased");
        } else {
          const newProduct = {
            productId: req.params.productid,
            quantity: 1,
            price: currProduct.price,
          };
          // console.log(newProduct);
          const cartid = cartexists[0]._id;
          const ourcart = await Cart.findById(cartid);
          // console.log(ourcart, "412");
          ourcart.products.push(newProduct);
          await ourcart.save();
          return res.status(200).json("New Product Added to Cart");
        }
      } else {
        return res.status(
          "Discard the previous Cart to add product from new Vendor"
        );
      }
    } else {
      const currProduct = await Product.findById(req.params.productid);
      const newProduct = {
        productId: req.params.productid.toString(),
        quantity: 1,
        // can change this quantity
        price: currProduct.price,
      };
      const newCart = await Cart.create({
        userId: userid.id,
        vendorId: currProduct.vendorId,
        products: [newProduct],
        status: "shopping",
      });
      return res.status(200).json("New product added Successfully");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});
// Discard the existing cart
const discardCart = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: userid.id });
    if (!user) {
      return res.status(500).json({ status: 500, msg: "User not Found" });
    }
    const cartexists = await Cart.find({
      userId: userid.id,
      status: "shopping",
    });
    await Cart.deleteOne({ _id: cartexists._id });
    res.status(200).json("Cart Deleted");
  } catch (error) {
    res.status(500).json({ error });
  }
});

// View Existing Cart
const viewCart = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: userid.id });
    if (!user) {
      return res.status(500).json({ status: 500, msg: "User not Found" });
    }
    const cartexists = await Cart.find({
      userId: userid.id,
      status: "shopping",
    }).populate([
      {
        path: "products.productId",
        model: "Product",
        select: "_id name price image qty unit",
      },
      {
        path: "vendorId",
        model: "Store",
        select: "_id storeName",
      },
    ]);
    // console.log(cartexists[0].products);
    let subTotal = 0;
    cartexists[0].products.forEach((ele) => (subTotal += ele.price));
    const serviceFee = (subTotal / 100) * 15;
    const Total = subTotal + serviceFee;
    const productCart = cartexists[0];
    const storename = cartexists[0].vendorId.storeName;
    res
      .status(200)
      .json({ productCart, storename, subTotal, serviceFee, Total });
  } catch (error) {
    res.status(500).json({ error });
  }
});
// Fetch Stores By category
const fetchBycategory = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.json("Login to continue");
    }
    let category = await Category.findById(req.params.categoryId);
    categoryName = category.subcategory;
    let options = await Store.find({ categories: categoryName });
    res.status(200).json({
      options,
      distance: "5km",
      time: "20mins",
      avgReview: "4.2",
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
// Fetch Stores according to sub-category of food items
const fetchStorebySubcategory = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.json("Login to continue");
    }
    let mycategory = await Category.findById(req.params.categoryId);

    categoryName = mycategory.subcategory;

    const storeProduct = await Product.distinct("vendorId", {
      subcategory: categoryName,
    });

    new Promise((resolve, reject) => {
      resolve(
        storeProduct.map(async (ele) => {
          const store = await Store.findById(ele);
          console.log(store);
          return store;
        })
      );
    }).then((response, request) => {
      return res.status(200).json({ response });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Fetch Products based on store and sub category
const fetchProducts = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.json("Login to continue");
    }
    let options = await Product.find({
      vendorId: req.params.vendorId,
      subcategory: req.params.subcategoryName,
    });
    let reviews = await Reviews.find({ vendorId: req.params.vendorId });
    let totalreviews = reviews.length;
    res.status(200).json({ options, totalreviews });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

const fetchCategories = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.json("Login to continue");
    }
    const categories = await Category.find({ parent: "null" });
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Fetch by Sub-Cateogry
const fetchsubCategories = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.json("Login to continue");
    }
    const categories = await Category.find({ parent: req.params.categoryId });
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ error });
  }
});
// Get by Sub-Cateogry
const getsubCategory = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.json("Login to continue");
    }
    console.log(req.params.vendorId);
    const storeProduct = await Product.distinct("subcategory", {
      vendorId: req.params.vendorId,
    });
    res.status(200).json({ storeProduct });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Fetch Coupon
const fetchCoupons = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.json("Login to continue");
    }
    const coupons = await Coupons.find();
    res.status(200).json({ coupons });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = {
  getsubCategory,
  fetchsubCategories,
  fetchCategories,
  fetchCoupons,
  addtoCart,
  viewCart,
  discardCart,
  particularOrder,
  register,
  login,
  newAddress,
  terms,
  addComplain,
  addReview,
  myorders,
  myAddress,
  fetchBycategory,
  fetchProducts,
  placeOrder,
  wallet,
  myaccount,
  addPrescription,
  fetchStorebySubcategory,
};
