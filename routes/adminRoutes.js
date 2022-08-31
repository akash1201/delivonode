const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  createCoupons,
  deleteCoupons,
  register,
  addMenu,
  showMenu,
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
  viewSlots,
  toggleSlot,
  removeSlot,
  addSlot,
} = require("../controller/AdminController.js");
const { signNewsletter } = require("../controller/NewsController.js");
const { protect } = require("../middleware/authMiddleware.js");
const { sendadminOtp, verifyadminOtp } = require("../controller/OtpVerify.js");

const router = express.Router();

router.post(`/register`, register);
router.post(`/sendNotice`, sendnotice);
router.post(`/removeSlot`, removeSlot);
router.post(`/addSlot`, addSlot);
router.post(`/toggleSlot`, toggleSlot);
router.get(`/termsConditions`, termsConditions);
router.get(`/viewSlots`, viewSlots);
router.post(`/updateTerms`, updateTerms);
router.post(`/updateCashback`, updateCashback);
router.post(`/addStation`, addStation);
router.get(`/showMenu/:vendorId`, showMenu);
router.post(`/addMenu/:vendorId`, addMenu);
router.post(`/sendIncentive`, sendIncentive);
router.post("/signNewsletter", signNewsletter);
router.post(`/settleMonthlyIncentive`, settleMonthlyIncentive);
router.post(`/updateIncentiveAmount`, updateIncentiveAmount);
router.post(`/login`, login);
router.post(`/createCategory`, createCategory);
router.get(`/viewCategory`, viewCategory);
router.get(`/viewCoupon`, viewCoupon);
router.get(`/fetchSubcategory`, fetchSubcategory);
router.put(`/deleteCategory/:categoryId`, deleteCategory);
router.post(`/updateCategory/:categoryId`, updateCategory);
router.post(`/createCoupons`, createCoupons);
router.put(`/deleteCoupons/:couponId`, deleteCoupons);
router.get("/viewVendors", viewVendors);
router.get(`/viewParticularVendor/:vendorId`, viewParticularVendor);
router.get(`/viewParticularDelivery/:deliveryId`, viewParticularDelivery);
router.get("/viewDelivery", viewDelivery);
router.get("/viewCustomers", viewCustomers);
router.get("/viewComplaints", viewComplaints);
router.put(`/removeVendor/:storeId`, removeVendor);
router.put(`/removeDelivery/:deliveryId`, removeDelivery);
router.put(`/addressComplaints/:complaintId`, addressComplaints);
router.post(`/approveVendors/:vendorId`, approveVendors);
router.post(`/approveDelivery/:deliveryId`, approveDelivery);
router.post(`/disapproveVendors/:vendorId`, disapproveVendors);
router.post(`/disapproveDelivery/:deliveryId`, disapproveDelivery);
router.post(`/updateCharges`, updateCharges);
router.post(`/addStation`, addStation);
router.post(`/updateIncentiveAmount`, updateIncentiveAmount);

router.post("/sendOtp", sendadminOtp);
router.post("/verifyOtp", verifyadminOtp);
module.exports = router;
