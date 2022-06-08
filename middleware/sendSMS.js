const twilio = require("twilio");

const accountSid = "";
const authtoken = "";

async function sendSMS(otp, userPhone) {
  try {
    const client = new twilio(accountSid, authtoken);
    await client.messages.create({
      body: `${otp}`,
      from: "+18504957775",
      to: `+91${userPhone}`,
    });
    console.log("SMS sent");
  } catch (error) {
    console.log(error);
  }
}
async function senderrorSMS(message, userPhone) {
  try {
    const client = new twilio(accountSid, authtoken);
    await client.messages.create({
      body: `${message}`,
      from: "+18504957775",
      to: `+91${userPhone}`,
    });
    console.log("SMS sent");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendSMS, senderrorSMS };
