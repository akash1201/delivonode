const asyncHandler = require("express-async-handler");
const NewsLetter = require("../models/NewsLetter.js");

const signNewsletter = asyncHandler(async (req, res) => {
  try {
    let { email } = req.body;
    let duplicate = await User.findOne({ email: email });
    if (duplicate) {
      return res
        .status(500)
        .json("You have already Signed Up for our NewsLetter");
    }
    let newsletter = await NewsLetter.create(req.body);
    res.status(200).json("Thank You for Signing Up to our Newsletter");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = { signNewsletter };
