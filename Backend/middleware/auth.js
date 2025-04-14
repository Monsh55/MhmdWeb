const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ملاحظة: يمكن تحسين نظام المصادقة مستقبلاً باستخدام JWT

// التحقق من المستخدم المصرح له
const protect = async (req, res, next) => {
  try {
    let token;

    // التحقق من وجود التوكن في الهيدرز
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "غير مصرح، يرجى تسجيل الدخول أولاً",
      });
    }

    // التحقق من صحة التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // التحقق من وجود المستخدم
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "المستخدم غير موجود",
      });
    }

    // إضافة معلومات المستخدم إلى الريكويست
    req.user = user;
    next();
  } catch (error) {
    console.error("خطأ في المصادقة:", error);
    res.status(401).json({
      success: false,
      message: "غير مصرح، يرجى تسجيل الدخول مرة أخرى",
    });
  }
};

// التحقق من دور المستخدم (للمسارات المحمية مستقبلاً)
const checkRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "غير مصرح، يرجى تسجيل الدخول أولاً",
      });
    }

    if (req.user.role !== role) {
      return res.status(403).json({
        success: false,
        message: "غير مسموح، ليس لديك صلاحية لهذه العملية",
      });
    }

    next();
  };
};

module.exports = {
  protect,
  checkRole,
};
