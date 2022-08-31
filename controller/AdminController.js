const asyncHandler = require("express-async-handler");
const User = require("../models/User.js");
const Complaints = require("../models/Complaints");
const { generateToken } = require("../utils/generateToken.js");
const jwt = require("jsonwebtoken");
const Order = require("../models/Orders.js");
const Delivery = require("../models/Delivery.js");
const Store = require("../models/Store.js");
const Product = require("../models/Products.js");
const sendMail = require("../utils/sendMail.js");
const Admin = require("../models/Admin.js");
const Category = require("../models/Category.js");
const Coupons = require("../models/Coupons.js");
const Menu = require("../models/Menu.js");
const sendSMS = require("../utils/sendSMS.js");
const { updateIncentive, updateMonth } = require("../utils/Scheduler.js");
const { sendNotice } = require("../utils/sendMail.js");
const csv = require("csvtojson");

// Add Station for Delivery
const addStation = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    let admin = await Admin.findById(adminid.id);
    let availableStations = admin.availableStations;
    let obj = {
      city: req.body.city,
      stationCode: req.body.stationCode,
      lat: req.body.lat,
      long: req.body.long,
    };
    let result = [...availableStations, obj];
    admin.availableStations = result;
    await admin.save();
    res.status(200).json({ mess: "New Station Added for delivery" });
  } catch (error) {
    res.status(500).json({ mess: error });
  }
});
// Send Incentives to all delivery person
const sendIncentive = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const delivery = await Delivery.distinct("_id");
    const today1 = new Date(Date.now());
    today1.setDate(today1.getDate() + 2);
    today1.setHours(0, 0, 0, 0);
    // const today2 = new Date(today1.getTime() + 60000);
    updateIncentive(delivery, today1, adminid.id);
    res.status(200).json("Monthly Incentives Updated");
  } catch (error) {
    res.status(500).json({ error });
  }
});

const settleMonthlyIncentive = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const delivery = await Delivery.distinct("_id");

    updateMonth(delivery);
    res.status(200).json("Incentives Updated");
  } catch (error) {
    res.status(500).json({ error });
  }
});

// update Incentive Amount
const updateIncentiveAmount = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    let exists = await Admin.findById(adminid.id);
    if (exists) {
      exists.incentiveTen1 = req.body.incentiveTen1 || exists.incentiveTen1;
      exists.incentiveTen2 = req.body.incentiveTen2 || exists.incentiveTen2;
      exists.incentiveTen3 = req.body.incentiveTen3 || exists.incentiveTen3;
      exists.incentiveTen4 = req.body.incentiveTen4 || exists.incentiveTen4;
      exists.incentiveTen5 = req.body.incentiveTen5 || exists.incentiveTen5;
      exists.save();
      return res.status(200).json({ mess: "Incentives Updated" });
    }

    res.status(200).json({ mess: "User not found" });
  } catch (error) {
    res.status(500).json({ mess: error });
  }
});

// Upload Menu
const addMenu = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const menu = await Menu.findOne({ vendorId: req.params.vendorId });
    console.log(menu, "3641865");
    const { fileName } = req.body;
    console.log(fileName, "745896");
    if (menu) {
      const productArray = await csv().fromFile(
        `${__dirname}/../routes/csvuploads/${fileName}`
      );
      console.log(productArray);
      menu.menu = [...menu.menu, ...productArray];
      menu.save();
      return res.status(200).json({ mess: "Menu Updated" });
    } else {
      const productArray = await csv().fromFile(
        `${__dirname}/../routes/csvuploads/${fileName}`
      );
      let newObj = {
        vendorId: req.params.vendorId,
        menu: productArray,
      };
      const newMenu = await Menu.create(newObj);
      return res.status(200).json({ mess: "New menu added" });
    }
  } catch (error) {
    res.status(500).json({ mess: "Internal server error" });
  }
});

// Display Menu
const showMenu = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let storeid = jwt.verify(token, process.env.JWT_SECRET);
    if (!storeid) {
      return res.status(500).json({ msg: "Authentication Failed" });
    }
    const menu = await Menu.findOne({ vendorId: req.params.vendorId });
    if (menu) {
      const mymenu = menu.menu;
      return res.status(200).json({ mymenu });
    } else {
      const mymenu = [];
      return res.status(200).json({ mymenu });
    }
  } catch (error) {
    res.status(500).json({ mess: "Internal server error" });
  }
});

// update cashback amount for vendors by category
const updateCashback = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const vendors = await Store.find();
    const category = await Category.find({ parent: "null" });
    vendors.forEach((ele) => {
      category.forEach((element) => {
        if (element.subcategory == ele.categories) {
          ele.cashback = element.cashBack;
          ele.save();
        }
      });
    });
    res.status(200).json({ mess: "Cashback Updated for old vendors" });
  } catch (error) {
    res.status(500).json({ mess: error });
  }
});

// Terms & Conditions
const termsConditions = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const admin = await Admin.findById(adminid.id);
    const terms = admin.termsConditions;
    res.status(200).json({ mess: terms });
  } catch (error) {
    res.status(500).json({ mess: "Internal server error" });
  }
});
// Add Slot
const addSlot = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const admin = await Admin.findById(adminid.id);
    const { isActive, timeInterval, isNow } = req.body;
    if (isNow) {
      const obj = {
        slot: timeInterval,
        isActive: isActive,
      };
      admin.slotNow = [...admin.slotNow, obj];
      admin.save();
      return res.status(200).json({ mess: "New time slot added" });
    }
    const obj = {
      slot: timeInterval,
      isActive: isActive,
    };
    admin.slotLater = [...admin.slotLater, obj];
    admin.save();
    res.status(200).json({ mess: "New time slot added" });
  } catch (error) {
    res.status(500).json({ mess: "Internal server error" });
  }
});
// View Time Slots
const viewSlots = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const admin = await Admin.findById(adminid.id);
    const slotNow = admin.slotNow;
    const slotLater = admin.slotLater;
    res.status(200).json({ slotNow, slotLater });
  } catch (error) {
    res.status(500).json({ mess: "Internal server error" });
  }
});
// Remove Slots
const removeSlot = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const admin = await Admin.findById(adminid.id);
    const { slotIndex, isNow } = req.body;
    if (isNow) {
      admin.slotNow.splice(slotIndex, 1);
      admin.save();
      return res.status(200).json({ mess: "Time Slot removed " });
    }
    admin.slotLater.splice(slotIndex, 1);
    admin.save();
    res.status(200).json({ mess: "Time Slot removed " });
  } catch (error) {
    res.status(500).json({ mess: "Internal server error" });
  }
});

// Toggle Active State of Time Slot
const toggleSlot = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const admin = await Admin.findById(adminid.id);
    const { slotIndex, isNow } = req.body;
    if (isNow) {
      admin.slotNow[slotIndex].isActive = !admin.slotNow[slotIndex];
      admin.save();
      return res.status(200).json({ mess: "Time Slot Toggled " });
    }
    admin.slotLater[slotIndex].isActive = !admin.slotLater[slotIndex];
    admin.save();
    res.status(200).json({ mess: "Time Slot Toggled " });
  } catch (error) {
    res.status(500).json({ mess: "Internal server error" });
  }
});

// Update Terms & Conditions
const updateTerms = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const exists = await Admin.findById(adminid.id);
    exists.termsConditions.customer =
      req.body.customer || exists.termsConditions.customer;
    exists.termsConditions.vendor =
      req.body.vendor || exists.termsConditions.vendor;
    exists.termsConditions.delivery =
      req.body.delivery || exists.termsConditions.delivery;
    exists.termsConditions.aboutUs =
      req.body.aboutUs || exists.termsConditions.aboutUs;
    exists.termsConditions.privacyPolicy =
      req.body.privacyPolicy || exists.termsConditions.privacyPolicy;
    await exists.save();
    res.status(200).json({ mess: "Terms & Conditions Updated" });
  } catch (error) {
    res.status(500).json({ mess: "Internal server error" });
  }
});

// Register
const register = asyncHandler(async (req, res) => {
  try {
    let { email } = req.body;
    let duplicate = await Admin.findOne({ email: email });
    if (duplicate) {
      return res
        .status(500)
        .json({ msg: "Admin already exists,please try to login" });
    } else {
      let admin = await Admin.create(req.body);
      res.json({
        _id: admin._id,
        token: generateToken(admin._id),
      });
    }
  } catch (error) {
    res.status(500).json({ mess: error });
  }
});

// Login
const login = asyncHandler(async (req, res) => {
  try {
    let { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res.status(500).json("User not found");
    }
    if (await admin.matchPassword(password)) {
      res.status(200).json({
        _id: admin._id,
        token: generateToken(admin._id),
      });
    } else {
      res.status(500).json({ mess: `Password didn't match` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// Create Category
const createCategory = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    var newParent = "null";
    if (req.body.parent != "null") {
      var parent = await Category.findOne({ subcategory: req.body.parent });
      newParent = parent._id.toString();
    }
    let obj = {
      parent: newParent,
      image: req.body.image,
      subcategory: req.body.subcategory,
      bgColor: "red",
      hsnCode: req.body.hsnCode,
      gstPercent: req.body.gstPercent,
      cashBack: req.body.cashBack,
    };
    const category = await Category.create(obj);
    res.status(200).json({ mess: "New Cateogry is Created" });
  } catch (error) {
    res.status(500).json({ mess: error });
  }
});

// Delete Category
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    let category = await Category.findById({ _id: req.params.categoryId });
    if (category) {
      await Category.deleteOne({ _id: req.params.categoryId });
      return res.status(200).json({ mess: "Category Deleted" });
    }
    res.status(500).json({ mess: "Category not found" });
  } catch (error) {
    res.status(500).json({ mess: error });
  }
});

// Update Category
const updateCategory = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    var newParent = "null";
    if (req.body.parent != "null") {
      var parent = await Category.findOne({ subcategory: req.body.parent });
      newParent = parent._id.toString();
    }
    let exists = await Category.findById(req.params.categoryId);

    if (exists) {
      exists.gstPercent = req.body.gstPercent || exists.gstPercent;
      exists.cashBack = req.body.cashBack || exists.cashBack;
      exists.hsnCode = req.body.hsnCode || exists.hsnCode;
      exists.parent = newParent;
      exists.image = req.body.image || exists.image;
      exists.subcategory = req.body.subcategory || exists.subcategory;
      await exists.save();
      return res.json({ mess: "Category Updated" });
    }
    res.status(500).json({ mess: "Category not found" });
  } catch (error) {
    res.status(500).json({ mess: error });
  }
});

// Create Coupons
const createCoupons = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    let id = adminid.id;
    let obj = {
      category: req.body.category,
      image: req.body.image,
      couponCode: req.body.couponCode,
      isPercent: req.body.isPercent,
      amountOff: req.body.amountOff,
      expiryDuration: req.body.expiryDuration,
      offeredBy: "admin",
      storeId: id,
    };
    const coupon = await Coupons.create(obj);
    res.status(200).json({ mess: "New Coupon is Created" });
  } catch (error) {
    res.status(500).json({ mess: error });
  }
});
// view Coupons
const viewCoupon = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }

    const coupon = await Coupons.find({
      offeredBy: "admin",
      storeId: adminid.id.toString(),
    });
    res.status(200).json({ mess: coupon });
  } catch (error) {
    res.status(500).json({ mess: error });
  }
});
// view Category
const viewCategory = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const parents = await Category.find({ parent: "null" });
    const custom = await Category.find({ parent: "custom" });
    const category = await Category.find({
      parent: { $ne: "null" },
      subcategory: { $ne: "custom" },
    }).populate([
      {
        path: "parent",
        model: "Category",
        select: "subcategory",
      },
    ]);
    let categories = [...parents, ...custom, ...category];
    res.status(200).json({ mess: categories });
  } catch (error) {
    res.status(500).json({ mess: error });
  }
});
// fetch sub Category
const fetchSubcategory = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const category = await Category.find({ parent: "null" });
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Delete Coupons
const deleteCoupons = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    let coupon = await Coupons.findById({ _id: req.params.couponId });
    if (coupon) {
      await Coupons.deleteOne({ _id: req.params.couponId });
      return res.status(200).json({ mess: "Coupon Deleted" });
    }
    res.status(500).json({ mess: "Coupon not found" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Update Charges
const updateCharges = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    let exists = await Admin.findById(adminid.id);
    if (exists) {
      exists.serviceFee = req.body.serviceFee || exists.serviceFee;
      exists.distanceFee = req.body.distanceFee || exists.distanceFee;
      exists.baseFare = req.body.baseFare || exists.baseFare;
      exists.customdistanceFee =
        req.body.customdistanceFee || exists.customdistanceFee;
      exists.customPackaging =
        req.body.customPackaging || exists.customPackaging;
      exists.save();
      return res.status(200).json({ mess: "Charges Updated" });
    }
    res.status(500).json({ mess: "User not found" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// View all Vendors
const viewVendors = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const vendors = await Store.find();
    // Can add a query to show only approved vendors
    res.status(200).json({ vendors });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// View Particular Vendor
const viewParticularVendor = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const vendor = await Store.findById(req.params.vendorId);
    // Can add a query to show only approved vendors
    res.status(200).json({ vendor });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// View Particular Delivery
const viewParticularDelivery = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const delivery = await Delivery.findById(req.params.deliveryId);
    // Can add a query to show only approved vendors
    res.status(200).json({ delivery });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Approve Vendors
const approveVendors = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const vendor = await Store.findById(req.params.vendorId);
    vendor.isApproved = true;
    // await Promise.all([
    //   sendMail("Your registration request has been approved", vendor.email),
    // ]);

    await vendor.save();
    let mes =
      "Thank You for Joining Gravity Bites. Your documents have been verified by our team. Grow your business with us";
    registrationMail(mes, vendor.email, "Account approved");
    res.status(200).json({ mess: "Vendor Registration Approved" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Disapprove Vendors
const disapproveVendors = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const vendor = await Store.findById(req.params.vendorId);
    vendor.isApproved = false;
    // await Promise.all([
    //   sendMail("Your registration request was not approved", vendor.email),
    // ]);

    await vendor.save();
    let mes =
      "Your account request has been dis-aaproved by our team as you didn't meet all the requirements to become a valid gravity bites partner.";
    registrationMail(mes, vendor.email, "Account disapproved");
    res.status(200).json({ mess: "Vendor Registration was disapproved" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Remove Vendor
const removeVendor = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const vendor = await Store.find({ _id: req.params.storeId });
    if (vendor) {
      await Store.deleteOne({
        _id: req.params.storeId,
      });
      return res.status(200).json({ mess: "Vendor was removed" });
    }
    res.status(500).json({ mess: "Vendor not found" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Send Notice
const sendnotice = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const { message, email, sub } = req.body;
    sendNotice(email, message, sub);
    res.status(200).json({ mess: "Notice sent to the user mail id" });
  } catch (error) {
    res.status(500).json({ mess: "Internal server error" });
  }
});

// View all Delivery Personnel
const viewDelivery = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const delivery = await Delivery.find();
    // Can add a query to give only approved delivery person
    res.status(200).json({ delivery });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Approve Delivery Personnel
const approveDelivery = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const delivery = await Delivery.findById(req.params.deliveryId);

    delivery.isApproved = true;

    // await Promise.all([
    //   sendMail("Your registration request has been approved", delivery.email),
    // ]);
    await delivery.save();
    let mes =
      "Congratulations you account has been approved, login in to your account to receive your frst order.";
    registrationMail(mes, delivery.email, "Account approved");
    res.status(200).json({ mess: "Delivery Person Approved" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Disapprove Delivery
const disapproveDelivery = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const delivery = await Delivery.findById(req.params.deliveryId);
    delivery.isApproved = false;
    // await Promise.all([
    //   sendMail("Your registration request was not approved", delivery.email),
    // ]);
    await delivery.save();
    let mes =
      "Your account request has been dis-aaproved by our team as you didn't meet all the requirements to become a valid gravity bites partner.";
    registrationMail(mes, delivery.email, "Account disapproved");
    res.status(200).json({ mess: "Delivery Registration was disapproved" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Remove Delivery Personal
const removeDelivery = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const delivery = await Delivery.find({
      _id: req.params.deliveryId,
    });
    if (delivery) {
      await Delivery.deleteOne({
        _id: req.params.deliveryId,
      });
      return res.status(200).json("Delivery Person was removed");
    }
    res.status(500).json({ mess: "Delivery Person not found" });
  } catch (error) {
    res.status(500).json({ mess: error.response });
  }
});

// View Customers
const viewCustomers = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const customers = await User.find();
    res.status(200).json({ customers });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// View Complaints
const viewComplaints = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const complaintStore = await Complaints.find({ user: "Vendor" }).populate([
      {
        path: "storeId",
        model: "Store",
        select: "fullName email",
      },
    ]);
    const complaintCustomer = await Complaints.find({
      user: "Customer",
    }).populate([
      {
        path: "storeId",
        model: "User",
        select: "name lastName email",
      },
    ]);
    const complaintDelivery = await Complaints.find({
      user: "Delivery",
    }).populate([
      {
        path: "storeId",
        model: "Delivery",
        select: "name email",
      },
    ]);
    const complaints = [
      ...complaintStore,
      ...complaintDelivery,
      ...complaintCustomer,
    ];
    res.status(200).json({ mess: complaints });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Address Complaints
const addressComplaints = asyncHandler(async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let adminid = jwt.verify(token, process.env.JWT_SECRET);
    if (!adminid) {
      return res.json("Login to continue");
    }
    const complaint = await Complaints.findById(req.params.complaintId);
    if (complaint.user == "Vendor") {
      const vendor = await Store.findById(complaint.storeId.toString());
      let mess = req.body.message;
      complaint.status = "closed";
      registrationMail(mess, vendor.email, "Complaint Addressed ");
      return res.status(200).json({ mess: "Complaint has been addressed" });
    }
    if (complaint.user == "Customer") {
      const vendor = await User.findById(complaint.storeId.toString());
      let mess = req.body.message;
      complaint.status = "closed";
      registrationMail(mess, vendor.email, "Complaint Addressed ");
      return res.status(200).json({ mess: "Complaint has been addressed" });
    }
    if (complaint.user == "Delivery") {
      const vendor = await Delivery.findById(complaint.storeId.toString());
      let mess = req.body.message;
      complaint.status = "closed";
      registrationMail(mess, vendor.email, "Complaint Addressed ");
      return res.status(200).json({ mess: "Complaint has been addressed" });
    }
    res.status(500).json({ mess: "Complaint not found" });
  } catch (error) {
    res.status(500).json({ mess: error.response });
  }
});
module.exports = {
  addMenu,
  showMenu,
  createCategory,
  updateCategory,
  deleteCategory,
  createCoupons,
  deleteCoupons,
  register,
  login,
  viewVendors,
  approveVendors,
  disapproveVendors,
  removeVendor,
  viewDelivery,
  approveDelivery,
  disapproveDelivery,
  removeDelivery,
  viewCustomers,
  viewComplaints,
  addressComplaints,
  viewParticularVendor,
  viewCoupon,
  viewCategory,
  fetchSubcategory,
  sendIncentive,
  settleMonthlyIncentive,
  updateIncentiveAmount,
  addStation,
  updateCashback,
  viewParticularDelivery,
  updateCharges,
  sendnotice,
  updateTerms,
  termsConditions,
  addSlot,
  viewSlots,
  removeSlot,
  toggleSlot,
};
