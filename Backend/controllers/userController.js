const User = require("../models/User");
const {
  sendVerificationEmail,
  sendResetCode,
} = require("../services/emailService");
const { validatePassword } = require("../utils/validators");
const { generateToken, generateVerificationCode } = require("../utils/helpers");

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password, newsletter } =
      req.body;

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

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: passwordValidation.message,
      });
    }

    const verificationToken = generateToken();

    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      password,
      newsletter: !!newsletter,
      verificationToken,
    });

    await newUser.save();

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
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "اسم المستخدم أو كلمة المرور غير صحيحة",
      });
    }

    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "اسم المستخدم أو كلمة المرور غير صحيحة",
      });
    }

    if (!user.verified) {
      return res.status(403).json({
        success: false,
        message: "يرجى تأكيد بريدك الإلكتروني قبل تسجيل الدخول",
        requiresVerification: true,
        userId: user._id,
      });
    }

    const userInfo = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      verified: user.verified,
    };

    res.status(200).json({
      success: true,
      message: "تم تسجيل الدخول بنجاح",
      user: userInfo,
    });
  } catch (error) {
    console.error("خطأ في تسجيل الدخول:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تسجيل الدخول، يرجى المحاولة مرة أخرى",
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "رمز التحقق غير صالح أو منتهي الصلاحية",
      });
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "تم تأكيد البريد الإلكتروني بنجاح، يمكنك الآن تسجيل الدخول",
    });
  } catch (error) {
    console.error("خطأ في تأكيد البريد الإلكتروني:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تأكيد البريد الإلكتروني، يرجى المحاولة مرة أخرى",
    });
  }
};

// نسيان كلمة المرور - طلب إرسال رمز
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // البحث عن المستخدم بالبريد الإلكتروني
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "البريد الإلكتروني غير مسجل في النظام",
      });
    }

    // إنشاء رمز إعادة تعيين كلمة المرور
    const resetCode = generateVerificationCode();

    // تخزين رمز إعادة التعيين وتاريخ انتهاء الصلاحية (5 دقائق)
    user.passwordResetToken = resetCode;
    user.passwordResetExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save();

    // إرسال رمز إعادة التعيين بالبريد الإلكتروني
    await sendResetCode(user, resetCode);

    res.status(200).json({
      success: true,
      message: "تم إرسال رمز التحقق إلى بريدك الإلكتروني",
      email: email,
    });
  } catch (error) {
    console.error("خطأ في إرسال رمز إعادة التعيين:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء إرسال رمز إعادة التعيين، يرجى المحاولة مرة أخرى",
    });
  }
};

// التحقق من رمز إعادة تعيين كلمة المرور
const verifyResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    // البحث عن المستخدم بالبريد الإلكتروني ورمز إعادة التعيين
    const user = await User.findOne({
      email,
      passwordResetToken: code,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "رمز التحقق غير صالح أو منتهي الصلاحية",
      });
    }

    res.status(200).json({
      success: true,
      message: "تم التحقق من الرمز بنجاح",
      email: email,
    });
  } catch (error) {
    console.error("خطأ في التحقق من الرمز:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء التحقق من الرمز، يرجى المحاولة مرة أخرى",
    });
  }
};

// إعادة تعيين كلمة المرور بعد التحقق من الرمز
const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    // التحقق من قوة كلمة المرور
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: passwordValidation.message,
      });
    }

    // البحث عن المستخدم بالبريد الإلكتروني ورمز إعادة التعيين
    const user = await User.findOne({
      email,
      passwordResetToken: code,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "رمز التحقق غير صالح أو منتهي الصلاحية",
      });
    }

    // تحديث كلمة المرور وإزالة بيانات إعادة التعيين
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "تم إعادة تعيين كلمة المرور بنجاح، يمكنك الآن تسجيل الدخول",
    });
  } catch (error) {
    console.error("خطأ في إعادة تعيين كلمة المرور:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء إعادة تعيين كلمة المرور، يرجى المحاولة مرة أخرى",
    });
  }
};

// الحصول على معلومات المستخدم
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select(
      "-password -verificationToken -passwordResetToken -passwordResetExpires"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "المستخدم غير موجود",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("خطأ في الحصول على معلومات المستخدم:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء جلب معلومات المستخدم",
    });
  }
};

// تحديث معلومات المستخدم
const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, newsletter } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "المستخدم غير موجود",
      });
    }

    // تحديث البيانات المسموح بتعديلها
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (newsletter !== undefined) user.newsletter = newsletter;

    await user.save();

    res.status(200).json({
      success: true,
      message: "تم تحديث معلومات المستخدم بنجاح",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        newsletter: user.newsletter,
        verified: user.verified,
      },
    });
  } catch (error) {
    console.error("خطأ في تحديث معلومات المستخدم:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تحديث معلومات المستخدم",
    });
  }
};

// إعادة إرسال رمز التحقق
const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "البريد الإلكتروني غير مسجل في النظام",
      });
    }

    if (user.verified) {
      return res.status(400).json({
        success: false,
        message: "تم تأكيد البريد الإلكتروني مسبقاً",
      });
    }

    // إنشاء رمز تحقق جديد
    const verificationToken = generateToken();
    user.verificationToken = verificationToken;
    await user.save();

    // إرسال بريد التحقق
    const emailSent = await sendVerificationEmail(user, verificationToken);

    res.status(200).json({
      success: true,
      message: "تم إعادة إرسال رمز التحقق بنجاح",
      emailSent,
    });
  } catch (error) {
    console.error("خطأ في إعادة إرسال رمز التحقق:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء إعادة إرسال رمز التحقق",
    });
  }
};

module.exports = {
  signup,
  login,
  verifyEmail,
  forgotPassword,
  verifyResetCode,
  resetPassword,
  getUserProfile,
  updateUserProfile,
  resendVerification,
};
