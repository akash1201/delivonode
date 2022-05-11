const express = require("express");
const {
  register,
  login,
  createCategory,
  deleteCategory,
  updateCategory,
  createCoupons,
  deleteCoupons,
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
} = require("../controller/AdminController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post(`/register`, register);
router.post(`/login`, login);
router.post(`/createCategory`, createCategory);
router.put(`/deleteCategory/:categoryId`, deleteCategory);
router.post(`/updateCategory`, updateCategory);
router.post(`/createCoupons`, createCoupons);
router.put(`/deleteCoupons/:couponId`, deleteCoupons);
router.get("/viewVendors", viewVendors);
router.get("/viewDelivery", viewDelivery);
router.get("/viewCustomers", viewCustomers);
router.get("/viewComplaints", viewComplaints);
router.put(`/removeVendor/:vendorId`, removeVendor);
router.put(`/removeDelivery/:deliveryId`, removeDelivery);
router.put(`/addressComplaints/:complaintId`, addressComplaints);
router.put(`/approveVendors/:vendorId`, approveVendors);
router.put(`/approveDelivery/:deliveryId`, approveDelivery);
router.put(`/disapproveVendors/:vendorId`, disapproveVendors);
router.put(`/disapproveDelivery/:deliveryId`, disapproveDelivery);
module.exports = router;
