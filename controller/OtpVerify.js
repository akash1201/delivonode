const asyncHandler = require("express-async-handler");
const User = require("../models/User.js");
const Store = require("../models/Store.js");
const Delivery = require("../models/Delivery.js");
const otpGenerator = require("otp-generator");
const { sendOTP, verifySMS } = require("../utils/sendSMS.js");

const sendmyOtp = asyncHandler(async (req, res) => {
  try {
    let { phoneNo } = req.body;
    let user = await User.findOne({ phoneNo: phoneNo });
    if (user) {
      const oneTimePasscode = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });
      user.otp = oneTimePasscode;
      await user.save();
      const phonenum = parseInt(phoneNo);
      sendOTP(phonenum, oneTimePasscode);
      res.status(200).json({ otp: "OTP send successfully" });
    } else {
      res.status(500).json({ otp: "Number not registered" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

const verifymyOtp = asyncHandler(async (req, res) => {
  try {
    let { phoneNo, verify } = req.body;
    let user = await User.findOne({ phoneNo: phoneNo });
    if (user.otp === verify) {
      user.otp = "";
      await user.save();
      let mynum = parseInt(phoneNo);
      let mess = `OTP Verified`;
      verifySMS(mess, mynum);
      return res.status(200).json({ mess: "OTP Verified" });
    }
    let errormess = "Incorrect OTP";
    verifySMS(errormess, mynum);
    res.status(500).json({ mess: "Incorrect OTP" });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});
const sendstoreOtp = asyncHandler(async (req, res) => {
  try {
    let { phoneNo } = req.body;
    let user = await Store.findOne({ phoneNo: phoneNo });
    if (user) {
      const oneTimePasscode = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });
      user.otp = oneTimePasscode;
      await user.save();
      const phonenum = parseInt(phoneNo);
      sendOTP(phonenum, oneTimePasscode);
      res.status(200).json({ otp: "OTP send successfully" });
    } else {
      res.status(500).json({ otp: "Number not registered" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

const verifystoreOtp = asyncHandler(async (req, res) => {
  try {
    let { phoneNo, verify } = req.body;
    let user = await Store.findOne({ phoneNo: phoneNo });
    if (user.otp === verify) {
      user.otp = "";
      await user.save();
      let mynum = parseInt(phoneNo);
      let mess = `OTP Verified`;
      verifySMS(mess, mynum);
      return res.status(200).json({ mess: "OTP Verified" });
    }
    let errormess = "Incorrect OTP";
    verifySMS(errormess, mynum);
    res.status(500).json({ mess: "Incorrect OTP" });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});
const senddeliveryOtp = asyncHandler(async (req, res) => {
  try {
    let { phoneNo } = req.body;
    let user = await Delivery.findOne({ phoneNo: phoneNo });
    if (user) {
      const oneTimePasscode = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });
      user.otp = oneTimePasscode;
      await user.save();
      const phonenum = parseInt(phoneNo);
      sendOTP(phonenum, oneTimePasscode);
      res.status(200).json({ otp: "OTP send successfully" });
    } else {
      res.status(500).json({ otp: "Number not registered" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

const verifydeliveryOtp = asyncHandler(async (req, res) => {
  try {
    let { phoneNo, verify } = req.body;
    let user = await Delivery.findOne({ phoneNo: phoneNo });
    if (user.otp === verify) {
      user.otp = "";
      await user.save();
      let mynum = parseInt(phoneNo);
      let mess = `OTP Verified`;
      verifySMS(mess, mynum);
      return res.status(200).json({ mess: "OTP Verified" });
    }
    let errormess = "Incorrect OTP";
    verifySMS(errormess, mynum);
    res.status(500).json({ mess: "Incorrect OTP" });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});
const sendadminOtp = asyncHandler(async (req, res) => {
  try {
    let { phoneNo, user } = req.body;
    if (user == "Delivery") {
      let delivery = await Delivery.findOne({ phoneNo: phoneNo });
      if (delivery) {
        const oneTimePasscode = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          specialChars: false,
        });
        delivery.otp = oneTimePasscode;
        await delivery.save();
        const phonenum = parseInt(phoneNo);
        sendOTP(phonenum, oneTimePasscode);
        return res.status(200).json({ otp: "OTP send successfully" });
      }
    }
    if (user == "Store") {
      let store = await Store.findOne({ phoneNo: phoneNo });
      if (store) {
        const oneTimePasscode = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          specialChars: false,
        });
        store.otp = oneTimePasscode;
        await store.save();
        const phonenum = parseInt(phoneNo);
        sendOTP(phonenum, oneTimePasscode);
        return res.status(200).json({ otp: "OTP send successfully" });
      }
    }
    if (user == "Customer") {
      let customer = await User.findOne({ phoneNo: phoneNo });
      if (customer) {
        const oneTimePasscode = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          specialChars: false,
        });
        customer.otp = oneTimePasscode;
        await customer.save();
        const phonenum = parseInt(phoneNo);
        sendOTP(phonenum, oneTimePasscode);
        return res.status(200).json({ otp: "OTP send successfully" });
      }
    } else {
      res.status(500).json({ otp: "Number not registered" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

const verifyadminOtp = asyncHandler(async (req, res) => {
  try {
    let { phoneNo, verify, user } = req.body;
    if (user == "Delivery") {
      let delivery = await Delivery.findOne({ phoneNo: phoneNo });
      if (delivery.otp === verify) {
        delivery.otp = "";
        await delivery.save();
        let mynum = parseInt(phoneNo);
        let mess = `OTP Verified`;
        verifySMS(mess, mynum);
        return res.status(200).json({ mess: "OTP Verified" });
      }
      let errormess = "Incorrect OTP";
      verifySMS(errormess, mynum);
      return res.status(500).json({ mess: "Incorrect OTP" });
    }
    if (user == "Store") {
      let store = await Store.findOne({ phoneNo: phoneNo });
      if (store.otp === verify) {
        store.otp = "";
        await store.save();
        let mynum = parseInt(phoneNo);
        let mess = `OTP Verified`;
        verifySMS(mess, mynum);
        return res.status(200).json({ mess: "OTP Verified" });
      }
      let errormess = "Incorrect OTP";
      verifySMS(errormess, mynum);
      return res.status(500).json({ mess: "Incorrect OTP" });
    }
    if (user == "Customer") {
      let customer = await User.findOne({ phoneNo: phoneNo });
      if (customer.otp === verify) {
        customer.otp = "";
        await customer.save();
        let mynum = parseInt(phoneNo);
        let mess = `OTP Verified`;
        verifySMS(mess, mynum);
        return res.status(200).json({ mess: "OTP Verified" });
      }
      let errormess = "Incorrect OTP";
      verifySMS(errormess, mynum);
      return res.status(500).json({ mess: "Incorrect OTP" });
    }
  } catch (error) {
    res.status(500).json({ mess: "Internal server error" });
  }
});
 
module.exports = {
  sendmyOtp,
  verifymyOtp,
  sendstoreOtp,
  verifystoreOtp,
  senddeliveryOtp,
  verifydeliveryOtp,
  sendadminOtp,
  verifyadminOtp,
};
