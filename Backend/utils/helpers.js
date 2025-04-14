// utils/helpers.js - دوال مساعدة
const crypto = require("crypto");

const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = {
  generateToken,
  generateVerificationCode,
};
