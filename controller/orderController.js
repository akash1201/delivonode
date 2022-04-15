//import asyncHandler from 'express-async-handler';
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { Order, populate } = require("../models/Orders");
const Reviews = require("../models/Reviews");

// Add Review to Order (Post req)
exports.addReview = asyncHandler(async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let userid = jwt.verify(token, process.env.JWT_SECRET);
  if (!userid) {
    return res.json({ msg: "User not found" });
  }
  const newReview = new Reviews({
    userId: userid.id,
    ...req.body,
  });
});
// Fetch Reviews (Get req)

exports.fetchReviews = asyncHandler(async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let storeid = jwt.verify(token, process.env.JWT_SECRET);
  if (!storeid) {
    return res.json({ msg: "User not found" });
  }
  const reviews = Review.find({ storeId: storeid.id }).populate(userId);
  res.status(200).json({ msg: reviews });
});

// Order placing Customer End (Post req)
exports.placeOrder = asyncHandler(async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let userid = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const duplicate = await User.findOne({ _id: userid.id });
    if (!duplicate) {
      return res.status(500).json({ status: 500, msg: "User not Found" });
    }
    const newOrder = new Order({
      ...req.body,
    });
    await newOrder.save();
    res.status(200).json({ msg: "Order Placed Successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, msg: err.message });
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
    res.status(200).json({ amount: $500 });
  } catch (error) {
    res.status(500).json({ status: 500, msg: err.message });
  }
});

// Get Order Details for Vendor Side (Get Req)
exports.getallorders = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    console.log(storeid.id);
    const orders = await Order.find().populate([
      {
        path: "products.productId",
        model: "Product",
        select: "_id name category",
      },
      {
        path: "products.vendorId",
        model: "Store",
        select: "_id",
      },
      {
        path: "products.userId",
        model: "user",
        select: "_id name lastname",
      },
    ]);

    let productList = [];
    orders.forEach((order) => {
      productList = [...productList, ...order.products];
    });
    orderInfo = productList.filter((ele) => ele.vendorId._id === storeid.id);
    res.send(200).json({ orderInfo });
  } catch (error) {
    res.status(500).json({ status: 500, msg: err.message });
  }
});

// Orders between Dates (Get req)
exports.betweendates = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.send(500).json({ msg: "Store not found" });
    }
    let orders = await Order.find({
      createdAt: {
        $gte: ISODate("2018-03-06T13:10:40.294Z"),
        $lt: ISODate("2018-05-06T13:10:40.294Z"),
      },
    });
    let productList = [];
    let count = 0;
    orders.forEach((order) => {
      productList = [...productList, ...order.products];
      if (order.products.some((ele) => ele.vendorId === storeid.id)) {
        count++;
      }
    });
    productList.filter((ele) => ele.vendorId === storeid.id);
    let itemsold = productList.length();
    res.status(200).json({ orders: count, itemsold: itemsold });
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
      return res.send(500).json({ msg: "Store not found" });
    }
    let orders = await Order.find({
      createdAt: {
        $gte: ISODate("2018-03-06T13:10:40.294Z"),
        $lt: ISODate("2018-05-06T13:10:40.294Z"),
      }.populate([
        {
          path: "products.productId",
          model: "Product",
          select: "_id name image",
        },
        {
          path: "products.vendorId",
          model: "Store",
          select: "_id",
        },
      ]),
    });
    let productList = [];
    orders.forEach((order) => {
      productList = [...productList, ...order.products];
    });
    productList.filter((ele) => ele.vendorId._id === storeid.id);
    let size = productList.length();
    let arr = productList.forEach((ele) => ele.products);
    let frequency = new Map();
    for (let i = 0; i < size; i++) {
      if (frequency.has(arr[i])) {
        frequency.set(arr[i], frequency.get(arr[i]) + 1);
      } else {
        frequency.set(arr[i], 1);
      }
    }
    //  this map returns products with there count so extract from it top 5 repeating elements.
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ status: 500, msg: err.message });
  }
});

// exports.getOrders = asyncHandler(async (req, res) => {
//   try {
//     let token = req.headers.authorization.split(" ")[1];
//     let storeid = jwt.verify(token, process.env.JWT_SECRET);
//     console.log(storeid.id);

//     let pageNo = req.params.pageNo ? req.params.pageNo : 1;

//     let type = req.params.type;
//     if (type == "all") {
//       let data = [
//         {
//           _id: userid.id,
//           name: "Devesh Goplani",
//           userId: userid.id,
//           date: new Date(),
//           paymenType: "COD",
//           status: "accepted",
//         },
//         {
//           _id: userid.id,
//           name: "Devesh Goplani",
//           userId: userid.id,
//           date: new Date(),
//           payment_type: "COD",
//           status: "accepted",
//           totalAmount: 100,
//           itemCount: 5,
//         },
//         {
//           _id: userid.id,
//           name: "Akash Chhetri",
//           userId: userid.id,
//           date: new Date(),
//           payment_type: "COD",
//           status: "accepted",
//           totalAmount: 150,
//           itemCount: 6,
//         },
//         {
//           _id: userid.id,
//           name: "Harshit Gupta",
//           userId: userid.id,
//           date: new Date(),
//           payment_type: "COD",
//           status: "accepted",
//           totalAmount: 150,
//           itemCount: 1,
//         },
//       ];

//       res.status(200).json({ status: 200, msg: "Success", data: data });
//     } else if (type == "pending") {
//       let data = [
//         {
//           _id: userid.id,
//           name: "Devesh Goplani",
//           userId: userid.id,
//           date: new Date(),
//           payment_type: "COD",
//           status: "pending",
//         },
//         {
//           _id: userid.id,
//           name: "Devesh Goplani",
//           userId: userid.id,
//           date: new Date(),
//           payment_type: "COD",
//           status: "pending",
//           totalAmount: 100,
//           itemCount: 5,
//         },
//         {
//           _id: userid.id,
//           name: "Akash Chhetri",
//           userId: userid.id,
//           date: new Date(),
//           payment_type: "COD",
//           status: "pending",
//           totalAmount: 150,
//           itemCount: 6,
//         },
//         {
//           _id: userid.id,
//           name: "Harshit Gupta",
//           userId: userid.id,
//           date: new Date(),
//           payment_type: "COD",
//           status: "pending",
//           totalAmount: 150,
//           itemCount: 1,
//         },
//       ];

//       res.status(200).json({ status: 200, msg: "Success", data: data });
//     } else {
//       res.status(400).json({ status: 400, msg: "Invalid type" });
//     }
//   } catch (err) {
//     res.status(500).json({ status: 500, msg: err.message });
//   }
// });

// exports.orderDetails = asyncHandler(async (req, res) => {
//   try {
//     let orderId = req.params.orderId;
//     let token = req.headers.authorization.split(" ")[1];
//     let userid = jwt.verify(token, process.env.JWT_SECRET);
//     console.log(userid.id);

//     let data = {
//       _id: userid.id,
//       userId: userid.id,
//       name: "Devesh Goplani",
//       contact: "7431979503",
//       items: [
//         {
//           name: "Onion",
//           amount: 1,
//           unit: "kg",
//           qty: 1,
//           price: 3,
//         },
//         {
//           name: "Potato",
//           amount: 1,
//           unit: "kg",
//           qty: 1,
//           price: 3,
//         },
//       ],
//       paymentType: "COD",
//       note: "Please keep tomato in separate bags",
//       deliveryDetails: {
//         name: "Ram Nath",
//         _id: userid.id,
//         phoneNo: "7545678976",
//       },
//     };

//     res.status(200).json({ status: 200, msg: "success", data: data });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });
