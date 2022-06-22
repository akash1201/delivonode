//import asyncHandler from 'express-async-handler';
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Order = require("../models/Orders");
const Reviews = require("../models/Reviews");
const Product = require("../models/Products.js");
const Store = require("../models/Store.js");
const Delivery = require("../models/Delivery.js");

// Fetch Reviews (Get req)
exports.fetchReviews = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.json("Authentication Failed");
    }
    const reviews = await Reviews.find({ vendorId: storeid.id }).populate([
      {
        path: "userId",
        model: "User",
        select: "_id name",
      },
    ]);
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

// Wallet Amount (Get req)
exports.walletAmount = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ msg: "User not found" });
    }
    res.status(200).json({ amount: "$500" });
  } catch (error) {
    res.status(500).json({ status: 500, msg: err.message });
  }
});

// Get Order Details for Vendor Side (Get Req)
exports.getallorders = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json("Authnetication Failed");
    }
    // const store = await Store.find({ _id: storeid.id.toString() });
    // if (store.isApproved == false) {
    //   return res.status(500).json("Registeration approval pending by admin");
    // }
    const orders = await Order.find({
      vendorId: storeid.id.toString(),
    }).populate([
      {
        path: "userId",
        model: "User",
        select: "_id name lastname phoneNo",
      },
    ]);
    res.status(200).json({ orders, date: "20 June", time: "11:35 am" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  try {
    console.log(req.headers, "111");
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json("Authnetication Failed");
    }
    const order = await Order.findById(req.params.orderId);
    order.status = "Order Accepted";
    order.packagingCharges = req.body.packagingCharges;
    await order.save();
    if (order.deliveryOption == "Home Delivery") {
      const delivery = await Delivery.find({ isAvailable: true });
      const deliveryman = delivery[Math.floor(Math.random() * delivery.length)];
      const orderAssignedTo = await Delivery.findById(deliveryman._id);
      order.deliveryPartner = deliveryman._id;
      orderAssignedTo.isAvailable = false;
      orderAssignedTo.status = "Assigned";
      orderAssignedTo.orderType = "Regular";
      await orderAssignedTo.save();
      return res
        .status(200)
        .json("Order Accepted By Store and Delivery Person Assigned");
    }
    order.deliveryPartner = null;
    res
      .status(200)
      .json("Order Accepted By Store Please Pickup your order from store");
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});
exports.declineOrderStatus = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json("Authnetication Failed");
    }
    const order = await Order.findById(req.params.orderId);
    order.status = "Order Declined";
    await order.save();
    res.status(200).json("Order Declined By Store");
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

// Orders between Dates (Get req)
exports.betweendates = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.send(500).json("Authentication Failed");
    }
    // const store = await Store.findById(storeid.id);
    // if (store.isApproved == false) {
    //   return res.status(500).json("Registeration approval pending by admin");
    // }
    // createdAt: {
    //   $gte: ISODate("2022-04-24T00:10:40.294Z"),
    //   $lt: ISODate("2022-04-26T00:10:40.294Z"),
    // },
    let orders = await Order.find({ vendorId: storeid.id.toString() }).populate(
      [
        {
          path: "products.productId",
          model: "Product",
          select: "_id price name",
        },
      ]
    );
    let orderNo = orders.length;
    let itemsold = 0;
    let earning = 0;
    orders.forEach((ele) => {
      earning += ele.Total;
      itemsold += ele.products.length;
    });
    res.status(200).json({ orderNo, itemsold, earning });
  } catch (error) {
    res.status(500).json({ status: 500, msg: err.message });
  }
});

//Get Top Selling Products (Get req)
exports.topselling = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.send(500).json("Authentication Failed");
    }
    // const store = await Store.find({ _id: storeid.id.toString() });
    // if (store.isApproved == false) {
    //   return res.status(500).json("Registeration approval pending by admin");
    // }
    let orders = await Order.aggregate([
      { $match: { vendorId: storeid.id.toString() } },
      {
        $unwind: {
          path: "$products",
        },
      },
      {
        $group: {
          _id: "$products.productId",
          totalSold: {
            $sum: "$products.quantity",
          },
        },
      },
      {
        $sort: {
          totalSold: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);
    let details = await Product.populate(orders, {
      path: "_id",
      select: { _id: 5, name: 5, image: 5 },
    });
    res.status(200).json({ details });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});
