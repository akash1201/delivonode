const asyncHandler = require("express-async-handler");
var messagebird = require("messagebird")(process.env.MESSAGEBIRD_API_KEY);

const sendmyOtp = asyncHandler(async (req, res) => {
  var number = req.body.number;
  // Make request to Verify API
  messagebird.verify.create(
    number,
    {
      originator: "Code",
      template: "Your verification code is %token.",
    },
    function (err, response) {
      if (err) {
        // Request has failed
        console.log(err);
        res.render("error", {
          error: err.errors[0].description,
        });
      } else {
        // Request was successful
        console.log(response);
        res.render("step2", {
          id: response.id,
        });
      }
    }
  );
});

const verifymyOtp = asyncHandler(async (req, res) => {
  var id = req.body.id;
  var token = req.body.token;
  // Make request to Verify API
  messagebird.verify.verify(id, token, function (err, response) {
    if (err) {
      // Verification has failed
      console.log(err);
      res.render("step2", {
        error: err.errors[0].description,
        id: id,
      });
    } else {
      // Verification was successful
      console.log(response);
      res.render("step3");
    }
  });
});

module.exports = {
  sendmyOtp,
  verifymyOtp,
};