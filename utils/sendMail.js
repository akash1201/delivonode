const nodemailer = require("nodemailer");
const sendMail = async (msg, userEmail) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: "",
      pass: "",
    },
  });
  return await transporter.sendMail({
    from: `"Admin Goyal" <imharsh098@gmail.com>`, // sender address
    to: userEmail, // list of receivers
    subject: "Email Confirmation - Registered!", // Subject line
    text: "Test", // plain text body
    html: `${msg}`, // html body
  });
};

module.exports = sendMail;
