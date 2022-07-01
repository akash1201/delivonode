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
const CustomDelivery = require("../models/CustomDelivery.js");
const axios = require("axios");
const Admin = require("../models/Admin.js");
const { Client } = require("@googlemaps/google-maps-services-js");
// const {
//   AddOnResultContext,
// } = require("twilio/lib/rest/api/v2010/account/recording/addOnResult.js");
// const sdk = require("api")("@cashfreedocs-new/v2#97f8kl3sscv9e");
// const PaymentGateway = require("@cashfreepayments/cashfree-sdk");

// Register
const register = asyncHandler(async (req, res) => {
  try {
    let { email } = req.body;
    let duplicate = await User.findOne({ email: email });
    if (duplicate) {
      return res
        .status(500)
        .json({ msg: "User already exists,please try to login" });
    } else {
      let user = await User.create(req.body);
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

      let address = await Address.create(obj);

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
      res.status(200).json({
        _id: user._id,
        token: generateToken(user._id),
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
    res.status(200).json({ mess: "Prescription added " });
  } catch (error) {
    res.status(500).json(error);
  }
});
// Add Tip Amount to Delivery Person
const addTip = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.status(500).json({ msg: "User not found" });
    }
    const order = await Order.findById(req.params.orderId);
    order.deliveryTip = req.body.deliveryTip;
    order.save();
    res.status(200).json({ mess: "Thank You for your reward" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Add Intruction for Order
const addInstruction = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.status(500).json({ msg: "User not found" });
    }
    const order = await Order.findById(req.params.orderId);
    order.instruction = req.body.instruction;
    order.save();
    res.status(200).json({
      mess: "Your instructions are valuable for us to serve your desired order",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

const customDelivery = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(userid.id);
    if (!user) {
      return res.status(500).json({ mess: "User not Found" });
    }
    let category = await Category.findOne({ parent: "Custom" });
    let orderaddress = await Address.findOne({ _id: req.body.addressId });
    const couponCode = req.body.couponCode || null;

    const admin = await Admin.findById(process.env.ADMIN_ID);
    let distFee = 0;
    let baseFare = admin.baseFare;
    // will modify this to let admin decide base Distance
    if (req.body.distance > 10) {
      let remainingDistance = req.body.distance - 10;
      distFee = remainingDistance * admin.customdistanceFee; //distance Fee per km
    }
    let subTotal = distFee + admin.customPackaging + admin.baseFare;
    let totalGST = (subTotal / 100) * category.gst;
    let serves = (subTotal / 100) * admin.serviceFee;
    let cashRedeemed = (subTotal / 100) * 0.2;
    // change this and add cashback for custom at admin End

    if (couponCode) {
      let code = await Coupons.findOne({
        couponCode: req.body.couponCode.toString(),
      });
      if (code) {
        const expiry = new Date(code.expiryDuration);
        const currDate = new Date(Date.now());
        if (expiry - currDate > 0) {
          if (code.isPercent) {
            const amount = subTotal;
            const discount = (amount / 100) * code.amountOff;
            subTotal = amount - discount;
          } else {
            const amount = subTotal;
            if (amount < code.amountOff) {
              return res.status(500).json({ mess: "Coupon Not Applicable" });
            }
            subTotal = amount - code.amountOff;
          }
        } else {
          return res.status(500).json({ mess: "Coupon Code Expired" });
        }
      } else {
        return res.status(500).json({ mess: "Invalid Coupon Code" });
      }
    }
    var Total = subTotal + totalGST + serves;
    let cashRemaining = req.body.cashbackUsed;
    if (cashRemaining > parseInt(Total)) {
      return res.status(500).json({
        mess: "Cashback Used is greater than total amount Order declined",
      });
    } else {
      const checkDate = new Date(Date.now());
      for (let i = 0; i < user.cashback.length; i++) {
        const expiry = new Date(user.cashback[i].expiryDate);

        if (expiry - checkDate > 0) {
          if (user.cashback[i].amount > cashRemaining) {
            user.cashback[i].amount = user.cashback[i].amount - cashRemaining;
            Total = Total - cashRemaining;
            user.cashbackAvailable = user.cashbackAvailable - cashRemaining;
            cashRemaining = 0;
          } else {
            cashRemaining = cashRemaining - user.cashback[i].amount;
            Total = Total - user.cashback[i].amount;
            user.cashbackAvailable =
              user.cashbackAvailable - user.cashback[i].amount;
            user.cashback[i].amount = 0;
          }
        } else {
          user.cashbackAvailable =
            user.cashbackAvailable - user.cashback[i].amount;
          user.cashback[i].amount = 0;
        }
      }
    }
    // // ******************************
    user.cashbackAvailable += cashRedeemed;
    const today1 = new Date(Date.now());
    today1.setDate(today1.getDate() + 10);

    let cash = {
      expiryDate: today1,
      amount: cashRedeemed,
    };
    const result = user.cashback.filter((ele) => ele.amount != 0);
    user.cashback = [...result, cash];
    // // ******************************
    await user.save();
    let deliveryOption = req.body.deliveryOption || "Home Delivery";
    let obj = {
      userId: userid.id,
      products: null,
      vendorId: null,
      status: "Order Placed",
      Total: parseInt(Total),
      GST: totalGST,
      subTotal: subTotal,
      productImage: req.body.productImage,
      packagingCharges: admin.customPackaging,
      distanceFee: distFee || 0,
      serviceFee: serves || 0,
      baseFare: baseFare || 0,
      cashbackUsed: req.body.cashbackUsed,
      instruction: req.body.instruction || null,
      deliveryOption: deliveryOption,
      couponCode: req.body.couponCode || null,
      address: orderaddress,
      pickupAddress: req.body.pickupAddress,
    };
    const newOrder = await Order.create(obj);
    res
      .status(200)
      .json({ mess: "Order Placed Successfully", orderId: newOrder._id });
  } catch (error) {
    res.status(500).json({ mess: error });
  }
});

//Assign Delivery Person for Custom Delivery Order
const assignCustomDelivery = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(userid.id);
    if (!user) {
      return res.status(500).json({ mess: "Login to continue" });
    }
    const order = await Order.findById(req.body.orderId);
    const delivery = await Delivery.find({ isAvailable: true });
    const deliveryman = delivery[Math.floor(Math.random() * delivery.length)];
    const orderAssignedTo = await Delivery.findById(deliveryman._id);
    order.deliveryPartner = deliveryman._id;
    orderAssignedTo.isAvailable = false;
    orderAssignedTo.status = "Assigned";
    orderAssignedTo.orderType = "Custom";
    await orderAssignedTo.save();
    return res
      .status(200)
      .json({ mess: "Custom order assigned to Delivery Person" });
  } catch (error) {
    res.status(500).json({ mess: error });
  }
});

// Add new Address
const newAddress = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.status(500).json({ mess: "User not Found" });
    }

    let address = await Address.create({
      userId: userid.id,
      ...req.body,
    });
    res.status(200).json({ mess: "New address added by user" });
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
// Update Home Address
const updateAddress = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(userid.id);
    const myaddress = await Address.findOne({ _id: req.params.addressId });
    console.log(myaddress);
    user.address.city = myaddress.city;
    user.address.streetName = myaddress.streetName;
    user.address.streetNumber = myaddress.streetNumber;
    user.address.zipcode = myaddress.zipcode;
    user.address.countryCode = myaddress.countryCode;
    user.address.stateCode = myaddress.stateCode;
    await user.save();
    res.status(200).json({ mess: "Home Address Updated" });
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
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
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
      user: "Customer",
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
    let obj = {
      userId: userid.id,
      vendorId: req.body.vendorId,
      rating: req.body.rating,
      comment: req.body.comment,
    };
    let newReview = await Reviews.create(obj);
    res.status(200).json({ mess: "New Review Added" });
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
    let totalItems = 0;
    order.products.forEach((ele) => (totalItems += ele.quantity));
    const products = order.products;
    const Total = order.Total;
    const packagingCharges = order.packagingCharges;
    const GST = order.GST;
    const distanceFee = order.distanceFee;
    const baseFare = order.baseFare;
    const subTotal = order.subTotal;

    res.status(200).json({
      products,
      Total,
      subTotal,
      packagingCharges,
      GST,
      distanceFee,
      baseFare,
      totalItems,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// remove expiry Coins
const removeCoins = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userid.id);
    if (!user) {
      return res.status(500).json({ status: 500, msg: "User not Found" });
    }
    user.cashback.forEach((ele) => {
      const expiry = new Date(ele.expiryDate);
      const currDate = new Date(Date.now());
      if (expiry - currDate < 0) {
        ele.amount = 0;
      }
    });
    let result = user.cashback.filter((ele) => ele.amount != 0);
    user.cashback = result;
    user.save();
    res.status(200).json({ mess: "Expired Coins Removed" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Prescription Order
const prescriptionOrder = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(userid.id);
    if (!user) {
      return res.status(500).json({ status: 500, msg: "User not Found" });
    }
    let vendor = await Store.findById(req.body.vendorId);
    let obj = {
      userId: userid.id,
      products: null,
      vendorId: req.body.vendorId,
      status: "Order Placed",
      Total: 0,
      GST: 0,
      packagingCharges: vendor.packagingCharge || 0,
      distanceFee: 0,
      // serviceFee: serves || 0,
      baseFare: 0,
      cashbackUsed: 0,
      instruction: req.body.instruction || null,
      deliveryOption: req.body.deliveryOption || "Home Delivery",
      couponCode: null,
      address: req.body.address,
    };
    const newOrder = await Order.create(obj);
    res.status(200).json("Order Placed");
  } catch (error) {
    res.status(500).json({ error });
  }
});

// view Coupons
const viewCoupon = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.json("Login to continue");
    }
    const store = await Store.findById(req.body.vendorId).populate([
      {
        path: "myCoupons.couponId",
        model: "Coupons",
        select:
          "_id category image offeredBy expiryDuration isPercent amountOff couponCode",
      },
    ]);
    const coupons = store.myCoupons;
    res.status(200).json({ coupons });
  } catch (error) {
    res.status(500).json({ error });
  }
});
// Fetch Stores with click on Banner
const fetchCouponStore = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.json("Login to continue");
    }
    const couponId = req.params.couponId;
    const stores = await Store.find({
      myCoupons: { $in: couponId },
    });
    res.status(200).json({ mess: stores });
  } catch (error) {
    res.status(500).json({ error });
  }
});
// Order placing Customer End (Post req)
const placeOrder = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(userid.id);
    if (!user) {
      return res.status(500).json({ status: 500, msg: "User not Found" });
    }
    let cart = await Cart.findOne({
      userId: userid.id,
      status: "shopping",
    });
    let vendor = await Store.findById(cart.vendorId.toString());
    let subTotal = 0;
    let totalGST = 0;
    cart.products.forEach((ele) => {
      subTotal += ele.price;
      totalGST += ele.gst;
    });

    let orderaddress = await Address.findOne({ _id: req.body.addressId });
    const couponCode = req.body.couponCode || null;

    const admin = await Admin.findById(process.env.ADMIN_ID);
    let distFee = 0;
    let baseFare = admin.baseFare;
    // will modify this to let admin decide base Distance
    if (req.body.distance > 10) {
      let remainingDistance = req.body.distance - 10;
      distFee = remainingDistance * admin.distanceFee; //distance Fee per km
    }
    // let serves = (subTotal / 100) * admin.serviceFee;
    let cashRedeemed = (subTotal / 100) * vendor.cashback;

    if (couponCode) {
      let code = await Coupons.findOne({
        couponCode: req.body.couponCode.toString(),
      });
      const result = vendor.myCoupons.filter((ele) => {
        return ele.couponId.toString() == code._id.toString();
      });
      if (result && code) {
        const expiry = new Date(code.expiryDuration);
        const currDate = new Date(Date.now());
        if (expiry - currDate > 0) {
          if (code.isPercent) {
            const amount = subTotal;
            const discount = (amount / 100) * code.amountOff;
            subTotal = amount - discount;
          } else {
            const amount = subTotal;
            if (amount < code.amountOff) {
              return res.status(500).json("Coupon Not Applicable");
            }
            subTotal = amount - code.amountOff;
          }
        } else {
          return res.status(500).json({ mess: "Invalid Coupon Code" });
        }
      } else {
        return res.status(500).json({ mess: "Invalid Coupon Code" });
      }
    }
    var Total =
      subTotal + totalGST + distFee + vendor.packagingCharge + admin.baseFare;
    let cashRemaining = req.body.cashbackUsed;
    console.log(cashRemaining, "before");
    if (cashRemaining > parseInt(Total)) {
      const mess = "Cashback Used is greater than total amount Order declined";
      return res.status(500).json({ mess });
    } else {
      const checkDate = new Date(Date.now());
      // console.log(user.cashback.length, "length");
      for (let i = 0; i < user.cashback.length; i++) {
        const expiry = new Date(user.cashback[i].expiryDate);
        // console.log(expiry, "expiry", i);
        if (expiry - checkDate > 0) {
          // console.log(expiry - checkDate, "checkDate", i);
          // console.log(user.cashback[i], i);
          if (user.cashback[i].amount > cashRemaining) {
            user.cashback[i].amount = user.cashback[i].amount - cashRemaining;
            Total = Total - cashRemaining;
            user.cashbackAvailable = user.cashbackAvailable - cashRemaining;
            cashRemaining = 0;
          } else {
            cashRemaining = cashRemaining - user.cashback[i].amount;
            Total = Total - user.cashback[i].amount;
            user.cashbackAvailable =
              user.cashbackAvailable - user.cashback[i].amount;
            user.cashback[i].amount = 0;
          }
        } else {
          user.cashbackAvailable =
            user.cashbackAvailable - user.cashback[i].amount;
          user.cashback[i].amount = 0;
        }
      }
    }
    // // ******************************
    user.cashbackAvailable += cashRedeemed;
    const today1 = new Date(Date.now());
    today1.setDate(today1.getDate() + 10);

    let cash = {
      expiryDate: today1,
      amount: cashRedeemed,
    };
    const result = user.cashback.filter((ele) => ele.amount != 0);
    user.cashback = [...result, cash];
    // // ******************************

    await user.save();
    let deliveryOption = req.body.deliveryOption || "Home Delivery";
    if (deliveryOption == "Takeway") {
      Total = Total - distFee - baseFare;
      distFee = 0;
      baseFare = 0;
    }

    let obj = {
      userId: userid.id,
      products: cart.products,
      vendorId: cart.vendorId,
      status: "Order Placed",
      Total: parseInt(Total),
      GST: totalGST,
      subTotal: subTotal,
      packagingCharges: vendor.packagingCharge || 0,
      distanceFee: distFee || 0,
      // serviceFee: serves || 0,
      baseFare: baseFare || 0,
      cashbackUsed: req.body.cashbackUsed,
      instruction: req.body.instruction || null,
      deliveryOption: deliveryOption,
      couponCode: req.body.couponCode || null,
      address: orderaddress,
    };
    const newOrder = await Order.create(obj);
    cart.status = "Order Placed";
    await cart.save();
    let mess = "Order Placed Successfully";
    res.status(200).json({ mess });
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
          ourcart.products[productalready].gst =
            ((currProduct.price * ourcart.products[productalready].quantity) /
              100) *
            currProduct.gst;
          ourcart.products[productalready].price =
            currProduct.price * ourcart.products[productalready].quantity;
          ourcart.save();

          return res.status(200).json("Product Quantity Increased");
        } else {
          const newProduct = {
            productId: req.params.productid,
            gst: (currProduct.price / 100) * currProduct.gst,
            quantity: 1,
            price: currProduct.price,
          };
          // console.log(newProduct);
          const cartid = cartexists[0]._id;
          const ourcart = await Cart.findById(cartid);
          ourcart.products.push(newProduct);
          await ourcart.save();
          return res.status(200).json("New Product Added to Cart");
        }
      } else {
        return res
          .status(500)
          .json("Discard the previous Cart to add product from new Vendor");
      }
    } else {
      const currProduct = await Product.findById(req.params.productid);
      const newProduct = {
        productId: req.params.productid.toString(),
        quantity: 1,
        gst: (currProduct.price / 100) * currProduct.gst,
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

// Reduce Quantity of Product from cart
const reduceQuantity = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.status(500).json({ status: 500, msg: "User not Found" });
    }
    const cartexists = await Cart.findOne({
      userId: userid.id.toString(),
      status: "shopping",
    }).populate([
      {
        path: "products.productId",
        model: "Product",
        select: "_id vendorId",
      },
    ]);
    console.log(req.params.productid);
    const productalready = cartexists.products.findIndex(
      (ele) => ele.productId._id.toString() === req.params.productid
    );
    const currProduct = await Product.findById(req.params.productid);
    if (productalready > -1) {
      const newQuantity = cartexists.products[productalready].quantity - 1;
      const newPrice = currProduct.price * newQuantity;
      cartexists.products[productalready].quantity = newQuantity;
      cartexists.products[productalready].gst =
        (newPrice / 100) * currProduct.gst;
      cartexists.products[productalready].price = newPrice;
      await cartexists.save();
      return res.status(200).json("Product Quantity Decreased");
    } else {
      return res.status(500).json("Product doesn't exits in cart");
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
    let totalGST = 0;
    cartexists[0].products.forEach((ele) => {
      subTotal += ele.price;
      totalGST += ele.gst;
    });
    // const serviceFee = (subTotal / 100) * 15;
    const Total = subTotal + totalGST;
    const productCart = cartexists[0];
    const storename = cartexists[0].vendorId.storeName;
    res.status(200).json({ productCart, storename, subTotal, totalGST, Total });
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
    let user = await User.findById(userid.id);
    let category = await Category.findById(req.params.categoryId);
    categoryName = category.subcategory;
    let options = await Store.find({ categories: categoryName });
    const admin = await Admin.findById(process.env.ADMIN_ID);
    let myCity = user.address.city;
    let available = admin.availableStations.filter((ele) => {
      return ele.city == myCity;
    });
    // let stores = options.filter((ele) => {
    //   return ele.address.city == myCity;
    // });
    // if (available) {
    // }
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
    let user = await User.findById(userid.id);
    let mycategory = await Category.findById(req.params.subcategoryId);

    categoryName = mycategory.subcategory;

    const storeProduct = await Product.distinct("vendorId", {
      subcategory: categoryName,
    });
    const now = await Store.find({ _id: { $in: storeProduct } });
    const admin = await Admin.findById(process.env.ADMIN_ID);
    let myCity = user.address.city;
    let available = admin.availableStations.filter((ele) => {
      return ele.city == myCity;
    });
    // let stores = now.filter((ele) => {
    //   return ele.address.city == myCity;
    // });
    // if (available) {
    // }

    res.status(200).json({ now });
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

// Add Favourite Stores
const addFav = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.json("Login to continue");
    }
    const user = await User.findById(userid.id);
    let obj = {
      vendorId: req.body.vendorId,
    };
    let result = [...user.myFav, obj];
    user.myFav = result;
    await user.save();
    res.status(200).json({ mess: "Store added to favourite list" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Show Favourite Stores
const showFav = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.json("Login to continue");
    }
    const user = await User.findById(userid.id).populate([
      {
        path: "myFav.vendorId",
        model: "Store",
        select:
          "_id storeImage address fullName storeName phoneNo email liscenseNo,",
      },
    ]);
    const stores = user.myFav;
    res.status(200).json({ stores });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Add delivery Rating for order
const orderRating = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.json("Login to continue");
    }
    const order = await Order.findById(req.body.orderId);
    order.rating = req.body.rating;
    await order.save();
    res.status(200).json({ mess: "Order Rating Updated" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Remove Store from Favourite
const removeFav = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.json("Login to continue");
    }
    const user = await User.findById(userid.id);
    const result = user.myFav.filter((ele) => {
      return ele.vendorId.toString() != req.body.vendorId;
    });
    user.myFav = result;
    await user.save();
    res.status(200).json({ mess: "Store removed from favourite list" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Show Store Reviews
const storeReviews = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.json("Login to continue");
    }
    const reviews = await Reviews.find({
      vendorId: req.body.vendorId,
    }).populate([
      {
        path: "userId",
        model: "User",
        select: "_id name",
      },
    ]);
    res.status(200).json({ reviews });
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
// Get store Sub-Cateogry
const getsubCategory = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.json("Login to continue");
    }
    console.log(req.params.vendorId);
    const subCategory = await Product.distinct("subcategory", {
      vendorId: req.params.vendorId,
    });
    res.status(200).json({ subCategory });
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
    const coupons = await Coupons.find({
      offeredBy: "admin",
      storeId: process.env.ADMIN_ID,
    });
    res.status(200).json({ coupons });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = {
  addTip,
  addInstruction,
  customDelivery,
  assignCustomDelivery,
  updateAddress,
  removeCoins,
  // prescriptionOrder,
  viewCoupon,
  fetchCouponStore,
  addFav,
  orderRating,
  removeFav,
  storeReviews,
  showFav,
  reduceQuantity,
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
