//import asyncHandler from 'express-async-handler';
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Order = require("../models/Orders");
const Reviews = require("../models/Reviews");
const Complaints = require("../models/Complaints");
const User = require("../models/User.js");

// Add Review to Order (Post req)
exports.addReview = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.json({ msg: "User not found" });
    }
    const newReview = new Reviews({
      userId: userid.id,
      vendorId: req.body.vendorId,
      rating: req.body.rating,
      comment: req.body.comment,
    });
    console.log(newReview);
    res.status(200).json({ msg: "Added Review", newReview });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
// Fetch Reviews (Get req)
exports.fetchReviews = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    console.log(storeid.id);
    if (!storeid) {
      return res.json({ msg: "User not found" });
    }
    const reviews = await Reviews.find({ vendorId: storeid.id });
    console.log(reviews);
    res.status(200).json({ msg: reviews });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

// Order placing Customer End (Post req)
exports.placeOrder = asyncHandler(async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let userid = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const user = await User.findOne({ _id: userid.id });
    if (!user) {
      return res.status(500).json({ status: 500, msg: "User not Found" });
    }
    let obj = {
      userId: userid.id,
      ...req.body,
    };
    const newOrder = new Order(obj);
    await newOrder.save();
    res.status(200).json({ msg: "Order Placed Successfully", newOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, msg: error });
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

    const orders = await Order.find({
      vendorId: storeid.id.toString(),
    }).populate([
      {
        path: "userId",
        model: "User",
        select: "_id name lastname phoneNo",
      },
    ]);
    console.log(orders);
    res.status(200).json({ orders });
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
      return res.send(500).json({ msg: "Store not found" });
    }
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
    var earning = 0;
    orders.forEach((ele) => {
      itemsold += ele.products.length;
      let le = ele.products.map((val) => {
        earning += val.productId.price;
        return val.productId.price;
      });
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
      return res.send(500).json({ msg: "Store not found" });
    }
    let orders = await Order.find({ vendorId: storeid.id.toString() }).populate(
      [
        {
          path: "products.productId",
          model: "Product",
          select: "_id image name",
        },
      ]
    );
    let productList = [];
    orders.forEach((ele) => {
      let le = ele.products.map((val) => {
        return val.productId.name;
      });
      productList = [...productList, ...le];
    });
    console.log(productList);
    // const counts = [];
    // productList.forEach((x) => {
    //   counts[x] = (counts[x] || 0) + 1;
    // });
    console.log(counts);
    function compareAge(a, b) {
      return a - b;
    }
    console.log(counts.sort((a, b) => a - b));
    //  this map returns products with there count so extract from it top 5 repeating elements.
    res.status(200).json({ counts });
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
