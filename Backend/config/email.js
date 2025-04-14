const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "malak.nasr.elshreef@gmail.com",
    pass: process.env.EMAIL_PASS || "wdtt ewnz jsew abtf",
  },
});

module.exports = { transporter };