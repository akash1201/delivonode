const express = require("express");

const {
  register,
  login,
  terms,
  accepted,
  picked,
  assigned,
  ordersDelivered,
  goOffline,
} = require("../controller/deliveryController");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/terms", terms);
router.post("/goOffline", goOffline);
router.put("/accepted", accepted);
router.put("/picked", picked);
router.get("/assigned", assigned);
router.get("/ordersDelivered", ordersDelivered);

module.exports = router;
