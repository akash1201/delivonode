const express = require("express");
const {
  settleMonthlyIncentive,
  updateIncentiveAmount,
  sendIncentive,
  register,
  fetchSubcategory,
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
  viewParticularVendor,
  removeDelivery,
  viewCategory,
  viewCoupon,
  viewCustomers,
  viewComplaints,
  addressComplaints,
} = require("../controller/AdminController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post(`/register`, register);
router.post(`/sendIncentive`, sendIncentive);
router.post(`/settleMonthlyIncentive`, settleMonthlyIncentive);
router.post(`/updateIncentiveAmount`, updateIncentiveAmount);
router.post(`/login`, login);
router.post(`/createCategory`, createCategory);
router.get(`/viewCategory`, viewCategory);
router.get(`/viewCoupon`, viewCoupon);
router.get(`/fetchSubcategory`, fetchSubcategory);
router.put(`/deleteCategory/:categoryId`, deleteCategory);
router.post(`/updateCategory`, updateCategory);
router.post(`/createCoupons`, createCoupons);
router.put(`/deleteCoupons/:couponId`, deleteCoupons);
router.get("/viewVendors", viewVendors);
router.get(`/viewParticularVendor/:vendorId`, viewParticularVendor);
router.get("/viewDelivery", viewDelivery);
router.get("/viewCustomers", viewCustomers);
router.get("/viewComplaints", viewComplaints);
router.put(`/removeVendor/:vendorId`, removeVendor);
router.put(`/removeDelivery/:deliveryId`, removeDelivery);
router.put(`/addressComplaints/:complaintId`, addressComplaints);
router.post(`/approveVendors/:vendorId`, approveVendors);
router.post(`/approveDelivery/:deliveryId`, approveDelivery);
router.post(`/disapproveVendors/:vendorId`, disapproveVendors);
router.post(`/disapproveDelivery/:deliveryId`, disapproveDelivery);
module.exports = router;
