const express = require("express");

const {
  register,
  login,
  terms,
  accepted,
  picked,
  assigned,
  ordersDelivered,
  delivered,
  goOffline,
  goOnline,
  myProfile,
  currDelivery,
  sendLink,
  resetLink,
  changePassword,
  declineDelivery,
  addComplain,
  getReviews,
} = require("../controller/deliveryController");
const { protect } = require("../middleware/authMiddleware.js");
const {
  senddeliveryOtp,
  verifydeliveryOtp,
} = require("../controller/OtpVerify.js");

const router = express.Router();

router.post("/register", register);
router.post(`/changePassword`, changePassword);
router.post(`/resetLink/:tokenId`, resetLink);
router.post("/senddeliveryOtp", senddeliveryOtp);
router.post("/verifydeliveryOtp", verifydeliveryOtp);
router.post(`/sendLink`, sendLink);
router.post("/login", login);
router.get("/terms", terms);
router.post(`/addComplain`, addComplain);
router.get(`/getReviews`, getReviews);
router.get(`/myProfile`, myProfile);
router.put("/goOffline", goOffline);
router.put("/goOnline", goOnline);
router.put("/accepted", accepted);
router.put("/declineDelivery", declineDelivery);
router.put("/picked", picked);
router.put("/delivered", delivered);
router.get("/assigned", assigned);
router.get("/ordersDelivered", ordersDelivered);
router.get(`/currDelivery`, currDelivery);

module.exports = router;
