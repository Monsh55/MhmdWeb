const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

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

const User = mongoose.model("User", userSchema);

module.exports = User;
