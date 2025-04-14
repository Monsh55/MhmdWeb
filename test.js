const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const validator = require("validator");

const app = express();
const PORT = 5500;

// MiddleWare
app.use(cors());
app.use(bodyParser.json());

// توفير الملفات الساكنة من مجلدات متعددة
app.use(express.static(path.join(__dirname, "../Frontend")));
app.use(express.static(path.join(__dirname, "../Frontend/Html")));
app.use(express.static(path.join(__dirname, "../Frontend/Script")));
app.use(express.static(path.join(__dirname, "../Frontend/Css")));

// اتصال بقاعدة البيانات
mongoose
  .connect("mongodb://localhost:27017/userAuth")
  .then(() => console.log("🔌 تم الاتصال بقاعدة البيانات بنجاح"))
  .catch((err) => console.error("❌ فشل الاتصال بقاعدة البيانات:", err));

// تعريف سكيما المستخدم
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "الاسم الأول مطلوب"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "اسم العائلة مطلوب"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "البريد الإلكتروني مطلوب"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "البريد الإلكتروني غير صالح",
    },
  },
  username: {
    type: String,
    required: [true, "اسم المستخدم مطلوب"],
    unique: true,
    trim: true,
    minlength: [3, "اسم المستخدم يجب أن يكون 3 أحرف على الأقل"],
  },
  password: {
    type: String,
    required: [true, "كلمة المرور مطلوبة"],
    minlength: [8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"],
  },
  newsletter: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// معالجة كلمة المرور قبل الحفظ
userSchema.pre("save", async function (next) {
  // فقط تشفير كلمة المرور إذا تم تعديلها
  if (!this.isModified("password")) return next();

  try {
    // تشفير كلمة المرور باستخدام bcrypt
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// إضافة طريقة للتحقق من كلمة المرور
userSchema.methods.checkPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// إنشاء موديل المستخدم
const User = mongoose.model("User", userSchema);

// إعداد Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com", // استبدلها ببريدك الإلكتروني
    pass: "your-app-password", // استبدلها بكلمة مرور التطبيق
  },
});

// وظيفة إرسال بريد التحقق
const sendVerificationEmail = async (user, verificationToken) => {
  const verificationUrl = `http://localhost:${PORT}/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: '"نظام الأمان - موقعك" <your-email@gmail.com>',
    to: user.email,
    subject: "تأكيد البريد الإلكتروني",
    text: `تستطيع تحقق البريد الإلكتروني بالضغط هنا: ${verificationUrl}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("تم إرسال بريد التحقق بنجاح");
    return true;
  } catch (error) {
    console.error("فشل في إرسال بريد التحقق:", error);
    return false;
  }
};

// مسار API لتسجيل مستخدم جديد
app.post("/api/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, username, password, newsletter } =
      req.body;

    // التحقق من وجود المستخدم
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "البريد الإلكتروني مستخدم بالفعل",
      });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "اسم المستخدم مستخدم بالفعل",
      });
    }

    // التحقق من قوة كلمة المرور
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "يجب أن تكون كلمة المرور 8 أحرف على الأقل",
      });
    }

    let passwordStrength = 0;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) passwordStrength += 1;
    if (/\d/.test(password)) passwordStrength += 1;
    if (/[^a-zA-Z0-9]/.test(password)) passwordStrength += 1;

    if (passwordStrength < 2) {
      return res.status(400).json({
        success: false,
        message:
          "كلمة المرور ضعيفة، يجب أن تحتوي على أحرف كبيرة وصغيرة، أرقام، ورموز",
      });
    }

    // إنشاء رمز تحقق
    const verificationToken = require("crypto").randomBytes(32).toString("hex");

    // إنشاء المستخدم الجديد
    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      password,
      newsletter: !!newsletter,
      verificationToken,
    });

    // حفظ المستخدم في قاعدة البيانات
    await newUser.save();

    // إرسال بريد التحقق
    const emailSent = await sendVerificationEmail(newUser, verificationToken);

    res.status(201).json({
      success: true,
      message:
        "تم إنشاء الحساب بنجاح" + (emailSent ? " وإرسال بريد التحقق" : ""),
      userId: newUser._id,
      requiresVerification: true,
    });
  } catch (error) {
    console.error("خطأ في التسجيل:", error);

    // معالجة أخطاء Mongoose
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء التسجيل، يرجى المحاولة مرة أخرى",
    });
  }
});

// مسار التحقق من البريد الإلكتروني
app.get("/verify-email", async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res
        .status(400)
        .send(
          '<script>window.location.href = "/login.html?error=invalid_token";</script>'
        );
    }

    // البحث عن المستخدم بواسطة الرمز
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res
        .status(400)
        .send(
          '<script>window.location.href = "/login.html?error=invalid_token";</script>'
        );
    }

    // تحديث حالة التحقق وإزالة الرمز
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    // إعادة التوجيه إلى صفحة تسجيل الدخول مع رسالة نجاح
    res.redirect("/login.html?verified=true");
  } catch (error) {
    console.error("خطأ في التحقق من البريد الإلكتروني:", error);
    res
      .status(500)
      .send(
        '<script>window.location.href = "/login.html?error=server_error";</script>'
      );
  }
});

// مسار API لتسجيل الدخول (يمكن إضافته لاحقاً)
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // البحث عن المستخدم باسم المستخدم أو البريد الإلكتروني
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "اسم المستخدم أو كلمة المرور غير صحيحة",
      });
    }

    // التحقق من كلمة المرور
    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "اسم المستخدم أو كلمة المرور غير صحيحة",
      });
    }

    // التحقق من تأكيد البريد الإلكتروني
    if (!user.verified) {
      return res.status(401).json({
        success: false,
        message: "يرجى التحقق من بريدك الإلكتروني قبل تسجيل الدخول",
        requiresVerification: true,
      });
    }

    // إنشاء كائن المستخدم للإرجاع (بدون كلمة المرور)
    const userObj = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    // هنا يمكن إضافة إنشاء توكن JWT للمصادقة

    res.status(200).json({
      success: true,
      message: "تم تسجيل الدخول بنجاح",
      user: userObj,
    });
  } catch (error) {
    console.error("خطأ في تسجيل الدخول:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تسجيل الدخول، يرجى المحاولة مرة أخرى",
    });
  }
});

// مسار API لإعادة إرسال بريد التحقق
app.post("/api/resend-verification", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "البريد الإلكتروني مطلوب",
      });
    }

    // البحث عن المستخدم
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "لم يتم العثور على المستخدم",
      });
    }

    if (user.verified) {
      return res.status(400).json({
        success: false,
        message: "تم التحقق من البريد الإلكتروني بالفعل",
      });
    }

    // إنشاء رمز تحقق جديد
    const verificationToken = require("crypto").randomBytes(32).toString("hex");
    user.verificationToken = verificationToken;
    await user.save();

    // إرسال بريد التحقق
    const emailSent = await sendVerificationEmail(user, verificationToken);

    if (emailSent) {
      res.status(200).json({
        success: true,
        message: "تم إعادة إرسال بريد التحقق بنجاح",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "فشل في إرسال بريد التحقق، يرجى المحاولة مرة أخرى",
      });
    }
  } catch (error) {
    console.error("خطأ في إعادة إرسال البريد:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ، يرجى المحاولة مرة أخرى",
    });
  }
});

// مسار API لإرسال رمز إعادة تعيين كلمة المرور
app.post("/api/send-verification-code", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "البريد الإلكتروني مطلوب",
      });
    }

    // البحث عن المستخدم
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "لم يتم العثور على المستخدم",
      });
    }

    // إنشاء رمز تحقق من 6 أرقام
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // تخزين الرمز وتاريخ انتهاء الصلاحية
    user.passwordResetToken = code;
    user.passwordResetExpires = Date.now() + 5 * 60 * 1000; // 5 دقائق
    await user.save();

    // إرسال البريد الإلكتروني مع الرمز
    const mailOptions = {
      from: '"نظام الأمان - موقعك" <your-email@gmail.com>',
      to: email,
      subject: "رمز التحقق لإعادة تعيين كلمة المرور",
      text: `رمز التحقق الخاص بك هو: ${code}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: "تم إرسال رمز التحقق بنجاح",
    });
  } catch (error) {
    console.error("خطأ في إرسال رمز التحقق:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء إرسال رمز التحقق، يرجى المحاولة مرة أخرى",
    });
  }
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
