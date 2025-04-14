const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// مسارات المصادقة
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/verify", userController.verifyEmail);
router.post("/forgot-password", userController.forgotPassword);
router.post("/verify-reset-code", userController.verifyResetCode);
router.post("/reset-password", userController.resetPassword);
router.post("/resend-verification", userController.resendVerification);

// مسارات المستخدم
router.get("/users/:userId", userController.getUserProfile);
router.put("/users/:userId", userController.updateUserProfile);

module.exports = router;
