const asyncHandler = require("express-async-handler");
const User = require("../models/User.js");
const Store = require("../models/Store.js");
const otpGenerator = require("otp-generator");
const { sendSMS, senderrorSMS } = require("../middleware/sendSMS.js");
const { sendMail } = require("../middleware/sendMail.js");

const sendmyOtp = asyncHandler(async (req, res) => {
  try {
    let { num } = req.body;
    let user = await User.findOne({ phoneNo: num });
    if (user) {
      const oneTimePasscode = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });
      user.otp = oneTimePasscode;
      await user.save();
      // const num = parseInt(phoneNo);
      const phonenum = parseInt("7046604163");
      sendSMS(oneTimePasscode, phonenum);
      res.status(200).json({ otp: oneTimePasscode });
    } else {
      const errorPhone = parseInt("7046604163");
      let mess = "Number not regsitered";
      senderrorSMS(mess, errorPhone);
      res.status(500).json({ otp: "Number not registered" });
    }
  } catch (error) {
    console.log(error);
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
      let mynum = parseInt("7046604163");
      let mess = "OTP Verified";
      senderrorSMS(mess, mynum);
      return res.status(200).json("OTP Verified");
    }
    let errormess = "Incorrect OTP";
    senderrorSMS(errormess, mynum);
    res.status(500).json("Incorrect OTP");
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

const sendEmail = asyncHandler(async (req, res) => {
  try {
    const { email, name } = req.body;
    sendMail(name, email);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

module.exports = {
  sendEmail,
  sendmyOtp,
  verifymyOtp,
};
