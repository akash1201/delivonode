//import asyncHandler from 'express-async-handler';
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Order = require("../models/Orders");
const Reviews = require("../models/Reviews");
const Product = require("../models/Products.js");
const User = require("../models/User.js");

// Fetch Reviews (Get req)
exports.fetchReviews = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.json("Authentication Failed");
    }
    const reviews = await Reviews.find({ vendorId: storeid.id });
    res.status(200).json(reviews);
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
    if (!storeid) {
      return res.status(500).json("Authnetication Failed");
    }
    const orders = await Order.find({
      vendorId: storeid.id.toString(),
    }).populate([
      {
        path: "userId",
        model: "User",
        select: "_id name lastname phoneNo",
      },
    ]);
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
      return res.send(500).json("Authentication Failed");
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
        earning += val.price;
        return earning;
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
      return res.send(500).json("Authentication Failed");
    }
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

    // let orders = await Order.find({ vendorId: storeid.id.toString() }).populate(
    //   [
    //     {
    //       path: "products.productId",
    //       model: "Product",
    //       select: "_id image name",
    //     },
    //   ]
    // );
    // let productList = [];
    // orders.forEach((ele) => {
    //   let le = ele.products.map((val) => {
    //     return val.productId.name;
    //   });
    //   productList = [...productList, ...le];
    // });
    // res.status(200).json({ productList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
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
