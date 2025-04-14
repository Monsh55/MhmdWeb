const express = require("express");
const { connectDB } = require("./config/db");
const { configServer, startServer } = require("./config/server");
const userRoutes = require("./routes/userRoutes");
const User = require("./models/User"); // نموذج المستخدم

// إنشاء تطبيق Express
const app = express();

// تكوين الخادم
configServer(app);

// اتصال بقاعدة البيانات
connectDB();

// تسجيل مسارات API
app.use("/api", userRoutes);
app.use("/verify-email", userRoutes);

app.get("/verify-email", async (req, res) => {
  try {
    const { token } = req.query;

    // البحث عن المستخدم باستخدام رمز التحقق
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).send("رابط التحقق غير صالح أو منتهي الصلاحية.");
    }

    // التحقق مما إذا كان البريد الإلكتروني قد تم تفعيله بالفعل
    if (user.verified) {
      return res.redirect("/email-already-verified.html");
    }

    // تحديث حالة التحقق
    user.verified = true;
    // user.verificationToken = undefined;
    await user.save();

    // إعادة توجيه المستخدم إلى صفحة النجاح
    res.redirect("/email-verified.html");
  } catch (error) {
    console.error("خطأ أثناء التحقق من البريد الإلكتروني:", error);
    res.status(500).send("حدث خطأ أثناء التحقق من البريد الإلكتروني.");
  }
});

// تشغيل الخادم
startServer(app);

module.exports = app; // للاختبار
