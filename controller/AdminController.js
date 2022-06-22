const asyncHandler = require("express-async-handler");
const User = require("../models/User.js");
const Complaints = require("../models/Complaints");
const generateToken = require("../utils/generateToken.js");
const jwt = require("jsonwebtoken");
const Order = require("../models/Orders.js");
const Delivery = require("../models/Delivery.js");
const Store = require("../models/Store.js");
const Product = require("../models/Products.js");
const sendMail = require("../utils/sendMail.js");
const Admin = require("../models/Admin.js");
const Category = require("../models/Category.js");
const Coupons = require("../models/Coupons.js");
const sendSMS = require("../utils/sendSMS.js");

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
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
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
      res.json({
        _id: admin._id,
        token: generateToken(admin._id),
      });
    } else {
      res.status(500).json({ message: `Password didn't match`, status: 500 });
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
    const category = await Category.create(req.body);
    res.status(200).json("New Cateogry is Created");
  } catch (error) {
    res.status(500).json({ error });
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
      return res.status(200).json("Category Deleted");
    }
    res.status(500).json("Category not found");
  } catch (error) {
    res.status(500).json({ error });
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
    let exists = await Category.findById({ _id: req.params.categoryId });
    if (exists) {
      exists.parent = req.body.parent || exists.parent;
      exists.subcateogry = req.body.subcateogry || exists.subcateogry;
      exists.image = req.body.image || exists.image;
      exists.bgColor = req.body.bgColor || exists.bgColor;
      let product = await exists.save();
      return res.json("Category Updated");
    }
    res.status(500).json("Category not found");
  } catch (error) {
    res.status(500).json({ error });
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
    const coupon = await Coupons.create(req.body);
    let mess = "New Coupon is Created";
    res.status(200).json({ mess });
  } catch (error) {
    res.status(500).json({ error });
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

    const coupon = await Coupons.find();
    res.status(200).json({ coupon });
  } catch (error) {
    res.status(500).json({ error });
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
    const category = await Category.find();
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ error });
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
    let category = await Coupons.findById({ _id: req.params.couponId });
    if (category) {
      await Coupons.deleteOne({ _id: req.params.couponId });
      return res.status(200).json("Coupon Deleted");
    }
    res.status(500).json("Coupon not found");
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
      exists.save();
    }
    let mess = "Charges Updated";
    res.status(200).json({ mess });
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
    res.status(200).json("Vendor Registration Approved");
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
    res.status(200).json("Vendor Registration was disapproved");
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
    const vendor = await Store.find({ _id: req.params.storeId.toString() });
    // await Promise.all([
    //   sendMail("Your account has been suspended", vendor.email),
    // ]);
    await Store.deleteOne({
      _id: req.params.storeId.toString(),
    });

    res.status(200).json("Vendor was removed");
  } catch (error) {
    res.status(500).json({ error });
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
    res.status(200).json("Delivery Person Approved");
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
    res.status(200).json("Delivery Registration was disapproved");
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
      _id: req.params.deliveryId.toString(),
    });
    await Promise.all([
      sendMail("Your account has been suspended", delivery.email),
    ]);
    await Delivery.deleteOne({
      _id: req.params.deliveryId.toString(),
    });

    res.status(200).json("Delivery Person was removed");
  } catch (error) {
    res.status(500).json({ error });
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
    const complaints = await Complaints.find();
    res.status(200).json({ complaints });
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
    const complaint = await Complaints.find({
      _id: req.params.complaintId.toString(),
    });
    console.log(complaint);
    await Promise.all([sendSMS(req.body.message, complaint.phoneNo)]);
    res.status(200).json("Complaint has been addressed");
  } catch (error) {
    res.status(500).json({ error });
  }
});
module.exports = {
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
};
