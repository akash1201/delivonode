const twilio = require("twilio");
const accountSid = "AC738b984c278833aad29daabf9c84b676";
const authtoken = "1d3b7048fc6ba3789014b87b6a657f9d";
const messagebird = require("messagebird")("6FbQzTsqI2vFfAZrvqYJhdVZu");

const sendSMS = async (msg, userPhone) => {
  try {
    const client = new twilio(accountSid, authtoken);
    await client.messages.create({
      body: ` ${msg} `,
      from: "+19206575386",
      to: userPhone,
    });
    console.log("SMS sent");
  } catch (error) {
    console.log(error);
  }
};

const sendMessage = () => {
  var params = {
    originator: "YourBrand",
    recipients: ["+917046604163"],
    body: "Hello, world!",
  };

  messagebird.messages.create(params, function (err, response) {
    if (err) {
      return console.log(err);
    }
    console.log("64351");
    console.log(response);
  });
};

module.exports = { sendSMS, sendMessage };
