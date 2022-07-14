//import asyncHandler from 'express-async-handler';
const asyncHandler = require("express-async-handler");
//import Store from '../models/Store.js';
const Store = require("../models/Store.js");
const jwt = require("jsonwebtoken");
const { generateToken, resetPassToken } = require("../utils/generateToken.js");
const Complaints = require("../models/Complaints.js");
const Category = require("../models/Category.js");
const Admin = require("../models/Admin.js");
const Coupons = require("../models/Coupons.js");
const Menu = require("../models/Menu.js");
const { Client } = require("@googlemaps/google-maps-services-js");
const {
  registrationMail,
  forgetPassword,

  sendMail,
} = require("../utils/sendMail.js");

// Terms and Conditions
const terms = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ msg: "Authentication Failed" });
    }
    let termsofuse =
      "lorem kwhfiuhwoilfc hfiuwk wehfiwehd wiehfkwenf wiehdfjkmd wehfuih fhirukhk ";
    let companypolicy =
      "jhbfwekfh,wekcbz,nmcbdkhfwuefgdjvb,mcnkjshdjc shgduilhilf ksdhfiuwhf shfuihwfc  kushfkjw";
    res.json({ termsofuse, companypolicy });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Go Offline
const goOffline = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ msg: "User not found" });
    }
    let store = await Store.findById(storeid.id);
    store.online = false;
    await store.save();
    res.status(200).json({ mess: "Vendor is Offline" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Go Offline
const goOnline = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ msg: "User not found" });
    }
    let store = await Store.findById(storeid.id);
    store.online = true;
    await store.save();
    res.status(200).json({ mess: "Vendor is Online" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Add Product to Menu
const addtoMenu = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ msg: "Authentication Failed" });
    }
    const menu = await Menu.findOne({ vendorId: storeid.id });
    if (menu) {
      let obj = {
        productName: req.body.productName,
        productPrice: req.body.productPrice,
      };
      let result = [...menu.menu, obj];
      menu.menu = result;
      await menu.save();
      return res.status(200).json({ mess: "New product Added to Menu" });
    }
    let obj2 = {
      productName: req.body.productName,
      productPrice: req.body.productPrice,
    };
    let menuu = {
      vendorId: storeid.id,
      menu: [obj2],
    };
    const newMenu = await Menu.create(menuu);
    res.status(200).json({ mess: "New menu create and product added" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Show my Menu
const showMenu = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ msg: "Authentication Failed" });
    }
    const menu = await Menu.findOne({ vendorId: storeid.id });
    if (menu) {
      const mymenu = menu.menu;
      return res.status(200).json({ mymenu });
    }
    res.status(200).json({ mess: "Menu is Empty" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Remove Product from Menu
const removefromMenu = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ msg: "Authentication Failed" });
    }
    const menu = await Menu.findOne({ vendorId: storeid.id });
    if (menu) {
      const result = menu.menu.filter((ele) => {
        return ele.productName != req.body.productName;
      });
      menu.menu = result;
      await menu.save();
      return res.status(200).json({ mess: "Product removed from Menu" });
    }
    return res.status(500).json({ mess: "Your Menu is empty" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Modify Packaging Charge
const packagingCharge = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ msg: "Authentication Failed" });
    }
    let store = await Store.findById(storeid.id);
    store.packagingCharge = req.body.packagingCharge;
    store.save();

    res.status(200).json({ mess: "Packaging Charges Updated" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Update Delivery train Station
const updateStation = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ msg: "Authentication Failed" });
    }
    const admin = await Admin.findById(process.env.ADMIN_ID);
    const vendor = await Store.findById(storeid.id);
    if (vendor.categories == "Groceries") {
      let myCity = req.body.stationCode;
      let available = admin.availableStations.filter((ele) => {
        return ele.stationCode == myCity;
      });
      console.log(available, "available");
      if (available) {
        // now check if the store this near the station to deliver food.
        const client = new Client({});
        client
          .distancematrix({
            params: {
              origins: [
                { lat: vendor.address.latitude, lng: vendor.address.longitude },
              ],
              destinations: [{ lat: available[0].lat, lng: available[0].long }],
              key: process.env.MAP_KEY,
            },
          })
          .then((r) => {
            const dt = r.data.rows[0].elements[0].distance.text;
            console.log(dt, "dt");
            const dist = dt.split(" ");
            const distance = dist[0];
            console.log(distance, "distance");
            if (parseInt(distance) > 4) {
              console.log("6451");
              vendor.deliveryStation = req.body.stationCode;
              vendor.save();
              console.log("false");
              return res
                .status(200)
                .json({ mess: "Station Code added for delivery location" });
            } else {
              return res
                .status(200)
                .json({ mess: "Store too far from station to allow delivery" });
            }
          })
          .catch((e) => {
            return res.status(500).json({ mess: e.response });
          });
      } else {
        return res
          .status(500)
          .json({ mess: "Currently service not available at this location" });
      }
    }
    res.status(200).json({ mess: "You are not authorised to update" });
  } catch (error) {
    res.status(500).json({ error });
  }
});
// Support
const support = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ mess: "Authentication Failed" });
    }
    let store = await Store.findById(storeid.id);
    if (!store) {
      return res.status(500).json({ mess: "Store not Found" });
    }
    // if (store.isApproved == false) {
    //   return res.status(500).json("Registeration approval pending by admin");
    // }
    const complain = new Complaints({
      storeId: storeid.id,
      phoneNo: req.body.phoneNo,
      message: req.body.message,
      user: "Vendor",
    });
    await complain.save();
    const PushNotifications = require("@pusher/push-notifications-server");

    let pushNotifications = new PushNotifications({
      instanceId: "7b809cb6-4ab5-4ceb-96a1-55d1d94a9a24",
      secretKey:
        "8F9F7DFF2E7986F40911345D2A051E6CB7669A108123750E309DA7C439493604",
    });
    pushNotifications
      .publishToInterests(["hello"], {
        apns: {
          aps: {
            alert: "Hello!",
          },
        },
        fcm: {
          notification: {
            title: "Hello",
            body: "Hello, world!",
          },
        },
      })
      .then((publishResponse) => {
        console.log("Just published:", publishResponse.publishId);
      })
      .catch((error) => {
        console.log("Error:", error);
      });

    // let Pusher = require("pusher");
    // let pusher = new Pusher({
    //   appId: process.env.PUSHER_APP_ID,
    //   key: process.env.PUSHER_APP_KEY,
    //   secret: process.env.PUSHER_APP_SECRET,
    //   cluster: process.env.PUSHER_APP_CLUSTER,
    // });
    // console.log("uly,bj");

    // pusher.trigger(
    //   "notifications",
    //   "post_updated",
    //   post,
    //   req.headers["x-socket-id"]
    // );
    res.status(200).json({ mess: "Complaint Registered" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Add Vendor Coupons
const createCoupons = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.json("Login to continue");
    }
    const store = await Store.findById(storeid.id);
    let id = storeid.id;
    let obj = {
      category: req.body.category,
      image: req.body.image,
      couponCode: req.body.couponCode,
      isPercent: req.body.isPercent || true,
      amountOff: req.body.amountOff,
      expiryDuration: req.body.expiryDuration,
      offeredBy: "vendor",
      storeId: id,
    };
    const coupon = await Coupons.create(obj);
    let obj2 = {
      couponId: coupon._id,
    };
    const result = [...store.myCoupons, obj2];
    store.myCoupons = result;
    await store.save();
    res.status(200).json({ mess: "New Coupon is Created" });
  } catch (error) {
    res.status(500).json({ error });
  }
});
// view Admin Coupons
const viewAdminCoupon = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.json("Login to continue");
    }

    const coupon = await Coupons.find({
      offeredBy: "admin",
      storeId: process.env.ADMIN_ID,
    });
    res.status(200).json({ coupon });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Add Admin Coupon to vendor list
const addCoupon = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.json("Login to continue");
    }
    let store = await Store.findById(storeid.id);
    let obj = {
      couponId: req.body.couponId,
    };
    const result = [...store.myCoupons, obj];
    store.myCoupons = result;
    await store.save();
    res.status(200).json({ mess: "Coupon added to vendor collection" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// view Coupons
const viewCoupon = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.json("Login to continue");
    }
    const store = await Store.findById(storeid.id).populate([
      {
        path: "myCoupons.couponId",
        model: "Coupons",
        select:
          "_id category image offeredBy expiryDuration isPercent amountOff couponCode",
      },
    ]);
    const coupons = store.myCoupons;
    res.status(200).json({ mess: coupons });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Delete Coupons
const deleteCoupons = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.json("Login to continue");
    }
    const store = await Store.findById(storeid.id);
    let coupon = await Coupons.findById({ _id: req.params.couponId });
    if ((coupon.offeredBy = "vendor")) {
      console.log(coupon.offeredBy);
      await Coupons.deleteOne({ _id: req.params.couponId });
      const result = store.myCoupons.filter((ele) => {
        console.log(ele.couponId);
        return ele.couponId.toString() != req.params.couponId;
      });
      store.myCoupons = result;
      await store.save();
      return res.status(200).json({ mess: "Coupon Deleted" });
    }
    if ((coupon.offeredBy = "admin")) {
      const result = store.myCoupons.filter((ele) => {
        return ele.couponId.toString() != req.params.couponId;
      });
      store.myCoupons = result;
      await store.save();
      return res
        .status(200)
        .json({ mess: "Admin coupon Deleted from store list" });
    }
    res.status(500).json({ mess: "Coupon not found" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// login
const login = asyncHandler(async (req, res) => {
  try {
    let { email, password } = req.body;
    const store = await Store.findOne({ email: email });
    if (!store) {
      return res.status(500).json("User not found");
    }
    if (await store.matchPassword(password)) {
      store.password = null;
      let categories = store.categories;
      res.json({
        _id: store._id,
        token: generateToken(store._id),
        categories,
      });
    } else {
      res.status(500).json({ message: `Password didn't match`, status: 500 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// register
const registerStore = asyncHandler(async (req, res) => {
  try {
    let { email, phoneNo } = req.body;
    let emailExists = await Store.findOne({ email: email });
    if (emailExists) {
      return res.status(500).json({ message: "Email already in use" });
    }
    let phoneExists = await Store.findOne({ phoneNo: phoneNo });
    if (phoneExists) {
      return res.status(500).json({ message: "PhoneNo already in use" });
    }
    let category = await Category.findOne({ subcategory: req.body.categories });
    let obj = {
      cashback: category.cashBack,
      ...req.body,
    };
    let store = await Store.create(obj);
    const txt = `Thank You for Signing Up with Gravity Bites.Your account will be activated once all your documents are verified by our team. Your Login creationals are userName:- ${email} Password:- ${req.body.password}`;
    registrationMail(txt, email, "New Registration confirmation");
    res.json({
      _id: store._id,
      token: generateToken(store._id),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Change Password
const changePassword = asyncHandler(async (req, res) => {
  try {
    let { email } = req.body;
    let user = await Store.findOne({ email: email });
    if (user && (await user.matchPassword(req.body.password))) {
      user.password = req.body.newPassword;
      await user.save();
      return res.status(200).json({ msg: "Password updated" });
    }
    res.status(500).json({ msg: "Invalid email or password" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

//send Link
const sendLink = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    let user = await Store.findOne({ email: email });
    if (user) {
      const token = resetPassToken(user._id);
      sendMail(token, email, "vendor");
    }
    res.status(500).json({ mess: "Email not found " });
  } catch (error) {
    res.status(500).json({ mess: "Internal Server Error" });
  }
});

// Reset Link
const resetLink = asyncHandler(async (req, res) => {
  try {
    let token = req.params.tokenId;
    let userid = jwt.verify(token, process.env.JWT_SECRET);
    if (!userid) {
      return res.status(500).json({ msg: "User not found" });
    }
    let user = await Store.findById(userid.id);
    if (user) {
      user.password = req.body.newPassword;
      await user.save();
      return res.status(200).json({ msg: "Password updated" });
    }
    res.status(500).json({ mess: "invalid reset link" });
  } catch (error) {
    res.status(500).json({ mess: error });
  }
});

module.exports = {
  goOffline,
  resetLink,
  sendLink,
  goOnline,
  addtoMenu,
  showMenu,
  removefromMenu,
  packagingCharge,
  updateStation,
  createCoupons,
  deleteCoupons,
  viewAdminCoupon,
  addCoupon,
  viewCoupon,
  registerStore,
  login,
  setStoreStatus,
  terms,
  support,
  showMap,
  changePassword,
};
