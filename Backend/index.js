// const express = require("express");
// const nodemailer = require("nodemailer");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const path = require("path");

// const app = express();
// const PORT = 5500;

// app.use(cors());
// app.use(bodyParser.json());

// // توفير الملفات الساكنة من مجلدات متعددة
// app.use(express.static(path.join(__dirname, "../Frontend")));
// app.use(express.static(path.join(__dirname, "../Frontend/Html")));
// app.use(express.static(path.join(__dirname, "../Frontend/Script")));
// app.use(express.static(path.join(__dirname, "../Frontend/Css")));

// // مسار API لإرسال الرمز
// app.post("/api/send-verification-code", async (req, res) => {
//   const { email, code } = req.body;

//   if (!email || !code) {
//     return res.status(400).json({ success: false, message: "بيانات ناقصة" });
//   }

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "malak.nasr.elshreef@gmail.com",
//       pass: "wdtt ewnz jsew abtf",
//     },
//   });

// const mailOptions = {
//   from: '"نظام الأمان - موقعك" <malak.nasr.elshreef@gmail.com>',
//   to: email,
//   subject: "رمز التحقق لإعادة تعيين كلمة المرور",
//   html: `
//   <!DOCTYPE html>
//   <html lang="ar" dir="rtl">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>رمز التحقق</title>
//       <style>
//         @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');

//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         body {
//           font-family: 'Tajawal', sans-serif;
//           background-color: #f0f0f0;
//           direction: rtl;
//           color: #333;
//           line-height: 1.6;
//         }

//         .email-wrapper {
//           width: 100%;
//           background-color: #f0f0f0;
//           padding: 30px 0;
//         }

//         .email-container {
//           max-width: 600px;
//           margin: 0 auto;
//           background-color: #ffffff;
//           border-radius: 12px;
//           overflow: hidden;
//           box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
//         }

//         .email-header {
//           background: linear-gradient(135deg, #064d06, #0bac0b);
//           position: relative;
//           overflow: hidden;
//           color: white;
//           text-align: center;
//           padding: 35px 20px;
//         }

//         .email-header::before {
//           content: "";
//           position: absolute;
//           top: -20px;
//           left: -20px;
//           width: 120px;
//           height: 120px;
//           background: rgba(255, 255, 255, 0.1);
//           border-radius: 50%;
//         }

//         .email-header::after {
//           content: "";
//           position: absolute;
//           bottom: -40px;
//           right: -40px;
//           width: 180px;
//           height: 180px;
//           background: rgba(255, 255, 255, 0.08);
//           border-radius: 50%;
//         }

//         .logo {
//           font-size: 32px;
//           font-weight: bold;
//           margin-bottom: 5px;
//           text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
//           position: relative;
//           z-index: 2;
//         }

//         .logo-tagline {
//           font-size: 16px;
//           opacity: 0.9;
//           position: relative;
//           z-index: 2;
//         }

//         .email-content {
//           padding: 40px 30px;
//           position: relative;
//         }

//         .greeting {
//           font-size: 22px;
//           font-weight: 500;
//           margin-bottom: 15px;
//           color: #222;
//         }

//         .message {
//           font-size: 16px;
//           color: #444;
//           margin-bottom: 30px;
//         }

//         .verification-code-container {
//           background: linear-gradient(to bottom, #f9f9f9, #f0f0f0);
//           border-radius: 12px;
//           margin: 30px auto;
//           padding: 25px;
//           text-align: center;
//           box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
//           border: 1px solid #e9e9e9;
//           max-width: 400px;
//         }

//         .verification-label {
//           font-size: 14px;
//           color: #666;
//           margin-bottom: 10px;
//           text-transform: uppercase;
//           letter-spacing: 1px;
//         }

//         .verification-code {
//           font-size: 34px;
//           font-weight: bold;
//           letter-spacing: 8px;
//           color: #064d06;
//           background-color: white;
//           border-radius: 8px;
//           padding: 15px 20px;
//           display: inline-block;
//           margin: 10px 0;
//           border: 1px dashed #bbb;
//           box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.05);
//         }

//         .expiry-info {
//           font-size: 14px;
//           color: #777;
//           text-align: center;
//           margin-top: 10px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 8px;
//         }

//         .expiry-info i {
//           color: #0bac0b;
//         }

//         .divider {
//           height: 1px;
//           background: linear-gradient(to right, transparent, #e0e0e0, transparent);
//           margin: 35px 0;
//         }

//         .security-note {
//           background-color: #f9f9f9;
//           border-radius: 8px;
//           border-right: 4px solid #0bac0b;
//           padding: 15px 20px;
//           margin: 25px 0;
//           font-size: 14px;
//           color: #555;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
//         }

//         .security-note-title {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           color: #064d06;
//           font-weight: 600;
//           margin-bottom: 8px;
//         }

//         .help-text {
//           margin-top: 30px;
//           background-color: #f5f9f5;
//           border-radius: 8px;
//           padding: 15px 20px;
//           font-size: 14px;
//           color: #555;
//         }

//         .help-text h3 {
//           font-size: 16px;
//           margin-bottom: 8px;
//           color: #064d06;
//         }

//         .email-footer {
//           background-color: #f8f8f8;
//           padding: 25px 20px;
//           text-align: center;
//           font-size: 13px;
//           color: #777;
//           border-top: 1px solid #eaeaea;
//         }

//         .social-links {
//           display: flex;
//           justify-content: center;
//           margin: 15px 0;
//           gap: 15px;
//         }

//         .social-link {
//           display: inline-block;
//           width: 36px;
//           height: 36px;
//           background-color: #e0e0e0;
//           border-radius: 50%;
//           text-align: center;
//           line-height: 36px;
//           color: #444;
//           text-decoration: none;
//           transition: background-color 0.3s ease;
//         }

//         .social-link:hover {
//           background-color: #0bac0b;
//           color: white;
//         }

//         .footer-links {
//           margin: 15px 0;
//         }

//         .footer-link {
//           color: #0bac0b;
//           text-decoration: none;
//           margin: 0 10px;
//         }

//         .footer-link:hover {
//           text-decoration: underline;
//         }

//         .copyright {
//           margin-top: 15px;
//           font-size: 12px;
//           color: #999;
//         }

//         .button {
//           display: inline-block;
//           background-color: #0bac0b;
//           color: white;
//           text-decoration: none;
//           padding: 12px 25px;
//           border-radius: 6px;
//           font-weight: 500;
//           margin-top: 20px;
//           transition: background-color 0.3s ease;
//           box-shadow: 0 4px 10px rgba(11, 172, 11, 0.2);
//         }

//         .button:hover {
//           background-color: #098009;
//         }

//         @media only screen and (max-width: 600px) {
//           .email-wrapper {
//             padding: 15px 0;
//           }

//           .email-content {
//             padding: 30px 20px;
//           }

//           .email-header {
//             padding: 25px 15px;
//           }

//           .logo {
//             font-size: 28px;
//           }

//           .verification-code {
//             font-size: 28px;
//             letter-spacing: 6px;
//             padding: 12px 15px;
//           }

//           .greeting {
//             font-size: 20px;
//           }
//         }
//       </style>
//     </head>
//     <body>
//       <div class="email-wrapper">
//         <div class="email-container">
//           <div class="email-header">
//             <div class="logo">موقعك</div>
//             <div class="logo-tagline">نظام الحماية والأمان</div>
//           </div>

//           <div class="email-content">
//             <h2 class="greeting">مرحباً،</h2>
//             <p class="message">لقد تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بحسابك. يرجى استخدام رمز التحقق التالي لإكمال العملية:</p>

//             <div class="verification-code-container">
//               <div class="verification-label">رمز التحقق الخاص بك</div>
//               <div class="verification-code">${code}</div>
//               <div class="expiry-info">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0bac0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                   <circle cx="12" cy="12" r="10"></circle>
//                   <polyline points="12 6 12 12 16 14"></polyline>
//                 </svg>
//                 ينتهي الرمز خلال <strong>5 دقائق</strong>
//               </div>
//             </div>

//             <a href="#" class="button">العودة إلى الموقع</a>

//             <div class="divider"></div>

//             <div class="security-note">
//               <div class="security-note-title">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#064d06" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                   <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
//                 </svg>
//                 ملاحظة أمنية
//               </div>
//               <p>إذا لم تقم بطلب إعادة تعيين كلمة المرور، يرجى تجاهل هذا البريد الإلكتروني أو التواصل فوراً مع فريق الدعم الفني لدينا.</p>
//             </div>

//             <div class="help-text">
//               <h3>هل تحتاج إلى مساعدة؟</h3>
//               <p>يرجى الرد على هذا البريد الإلكتروني أو التواصل مع فريق الدعم لدينا عبر <a href="mailto:support@yourwebsite.com" style="color: #0bac0b;">support@yourwebsite.com</a> وسنقوم بمساعدتك في أقرب وقت ممكن.</p>
//             </div>
//           </div>

//           <div class="email-footer">
//             <div class="social-links">
//               <a href="#" class="social-link" title="فيسبوك">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                   <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
//                 </svg>
//               </a>
//               <a href="#" class="social-link" title="تويتر">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                   <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
//                 </svg>
//               </a>
//               <a href="#" class="social-link" title="انستغرام">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                   <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
//                   <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
//                   <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
//                 </svg>
//               </a>
//             </div>

//             <div class="footer-links">
//               <a href="#" class="footer-link">سياسة الخصوصية</a>
//               <a href="#" class="footer-link">الشروط والأحكام</a>
//               <a href="#" class="footer-link">مركز المساعدة</a>
//             </div>

//             <p>هذا بريد إلكتروني تم إنشاؤه تلقائياً، يرجى عدم الرد عليه مباشرة</p>

//             <div class="copyright">
//               © ${new Date().getFullYear()} موقعك. جميع الحقوق محفوظة
//             </div>
//           </div>
//         </div>
//       </div>
//     </body>
//   </html>
//   `,
//   text: `رمز التحقق الخاص بك هو: ${code}
// ينتهي الرمز خلال 5 دقائق.

// ---
// ملاحظة أمنية: إذا لم تقم بطلب إعادة تعيين كلمة المرور، يرجى تجاهل هذا البريد الإلكتروني.

// هل تحتاج إلى مساعدة؟
// يرجى التواصل مع فريق الدعم لدينا عبر support@yourwebsite.com

// © ${new Date().getFullYear()} موقعك. جميع الحقوق محفوظة`,
// };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ success: true, message: "تم إرسال الرمز" });
//   } catch (error) {
//     console.error("فشل في الإرسال:", error);
//     res.status(500).json({ success: false, message: "فشل في الإرسال" });
//   }
// });

// // تشغيل السيرفر
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });

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
    html: `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تأكيد البريد الإلكتروني</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Tajawal', sans-serif;
            background-color: #f0f0f0;
            direction: rtl;
            color: #333;
            line-height: 1.6;
          }
          
          .email-wrapper {
            width: 100%;
            background-color: #f0f0f0;
            padding: 30px 0;
          }
          
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          }
          
          .email-header {
            background: linear-gradient(135deg, #064d06, #0bac0b);
            position: relative;
            overflow: hidden;
            color: white;
            text-align: center;
            padding: 35px 20px;
          }
          
          .email-header::before {
            content: "";
            position: absolute;
            top: -20px;
            left: -20px;
            width: 120px;
            height: 120px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
          }
          
          .email-header::after {
            content: "";
            position: absolute;
            bottom: -40px;
            right: -40px;
            width: 180px;
            height: 180px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 50%;
          }
          
          .logo {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 5px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            position: relative;
            z-index: 2;
          }
          
          .logo-tagline {
            font-size: 16px;
            opacity: 0.9;
            position: relative;
            z-index: 2;
          }
          
          .email-content {
            padding: 40px 30px;
            position: relative;
          }
          
          .greeting {
            font-size: 22px;
            font-weight: 500;
            margin-bottom: 15px;
            color: #222;
          }
          
          .message {
            font-size: 16px;
            color: #444;
            margin-bottom: 30px;
          }
          
          .button {
            display: inline-block;
            background-color: #0bac0b;
            color: white;
            text-decoration: none;
            padding: 12px 25px;
            border-radius: 6px;
            font-weight: 500;
            margin-top: 20px;
            transition: background-color 0.3s ease;
            box-shadow: 0 4px 10px rgba(11, 172, 11, 0.2);
          }
          
          .button:hover {
            background-color: #098009;
          }
          
          .divider {
            height: 1px;
            background: linear-gradient(to right, transparent, #e0e0e0, transparent);
            margin: 35px 0;
          }
          
          .security-note {
            background-color: #f9f9f9;
            border-radius: 8px;
            border-right: 4px solid #0bac0b;
            padding: 15px 20px;
            margin: 25px 0;
            font-size: 14px;
            color: #555;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          }
          
          .security-note-title {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #064d06;
            font-weight: 600;
            margin-bottom: 8px;
          }
          
          .email-footer {
            background-color: #f8f8f8;
            padding: 25px 20px;
            text-align: center;
            font-size: 13px;
            color: #777;
            border-top: 1px solid #eaeaea;
          }
          
          .copyright {
            margin-top: 15px;
            font-size: 12px;
            color: #999;
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="email-container">
            <div class="email-header">
              <div class="logo">موقعك</div>
              <div class="logo-tagline">نظام الحماية والأمان</div>
            </div>
            
            <div class="email-content">
              <h2 class="greeting">مرحباً ${user.firstName}،</h2>
              <p class="message">شكراً لتسجيلك في موقعنا. يرجى تأكيد بريدك الإلكتروني بالنقر على الزر أدناه:</p>
              
              <div style="text-align: center;">
                <a href="${verificationUrl}" class="button">تأكيد البريد الإلكتروني</a>
              </div>
              
              <div class="divider"></div>
              
              <div class="security-note">
                <div class="security-note-title">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#064d06" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  ملاحظة أمنية
                </div>
                <p>إذا لم تقم بالتسجيل في موقعنا، يرجى تجاهل هذا البريد الإلكتروني.</p>
              </div>
            </div>
            
            <div class="email-footer">
              <div class="copyright">
                © ${new Date().getFullYear()} موقعك. جميع الحقوق محفوظة
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
    `,
    text: `مرحباً ${user.firstName}،

شكراً لتسجيلك في موقعنا. يرجى تأكيد بريدك الإلكتروني بزيارة الرابط التالي:

${verificationUrl}

إذا لم تقم بالتسجيل في موقعنا، يرجى تجاهل هذا البريد الإلكتروني.

© ${new Date().getFullYear()} موقعك. جميع الحقوق محفوظة`,
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
      html: `
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>رمز التحقق</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Tajawal', sans-serif;
              background-color: #f0f0f0;
              direction: rtl;
              color: #333;
              line-height: 1.6;
            }
            
            .email-wrapper {
              width: 100%;
              background-color: #f0f0f0;
              padding: 30px 0;
            }
            
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
            }
            
            .email-header {
              background: linear-gradient(135deg, #064d06, #0bac0b);
              position: relative;
              overflow: hidden;
              color: white;
              text-align: center;
              padding: 35px 20px;
            }
            
            .logo {
              font-size: 32px;
              font-weight: bold;
              margin-bottom: 5px;
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
              position: relative;
              z-index: 2;
            }
            
            .logo-tagline {
              font-size: 16px;
              opacity: 0.9;
              position: relative;
              z-index: 2;
            }
            
            .email-content {
              padding: 40px 30px;
              position: relative;
            }
            
            .greeting {
              font-size: 22px;
              font-weight: 500;
              margin-bottom: 15px;
              color: #222;
            }
            
            .message {
              font-size: 16px;
              color: #444;
              margin-bottom: 30px;
            }
            
            .verification-code-container {
              background: linear-gradient(to bottom, #f9f9f9, #f0f0f0);
              border-radius: 12px;
              margin: 30px auto;
              padding: 25px;
              text-align: center;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
              border: 1px solid #e9e9e9;
              max-width: 400px;
            }
            
            .verification-label {
              font-size: 14px;
              color: #666;
              margin-bottom: 10px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            
            .verification-code {
              font-size: 34px;
              font-weight: bold;
              letter-spacing: 8px;
              color: #064d06;
              background-color: white;
              border-radius: 8px;
              padding: 15px 20px;
              display: inline-block;
              margin: 10px 0;
              border: 1px dashed #bbb;
              box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.05);
            }
            
            .expiry-info {
              font-size: 14px;
              color: #777;
              text-align: center;
              margin-top: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
            }
            
            .security-note {
              background-color: #f9f9f9;
              border-radius: 8px;
              border-right: 4px solid #0bac0b;
              padding: 15px 20px;
              margin: 25px 0;
              font-size: 14px;
              color: #555;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
            }
            
            .security-note-title {
              display: flex;
              align-items: center;
              gap: 8px;
              color: #064d06;
              font-weight: 600;
              margin-bottom: 8px;
            }
            
            .email-footer {
              background-color: #f8f8f8;
              padding: 25px 20px;
              text-align: center;
              font-size: 13px;
              color: #777;
              border-top: 1px solid #eaeaea;
            }
            
            .copyright {
              margin-top: 15px;
              font-size: 12px;
              color: #999;
            }
          </style>
        </head>
        <body>
          <div class="email-wrapper">
            <div class="email-container">
              <div class="email-header">
                <div class="logo">موقعك</div>
                <div class="logo-tagline">نظام الحماية والأمان</div>
              </div>
              
              <div class="email-content">
                <h2 class="greeting">مرحباً ${user.firstName}،</h2>
                <p class="message">لقد تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بحسابك. يرجى استخدام رمز التحقق التالي لإكمال العملية:</p>
                
                <div class="verification-code-container">
                  <div class="verification-label">رمز التحقق الخاص بك</div>
                  <div class="verification-code">${code}</div>
                  <div class="expiry-info">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0bac0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10">                                            </circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                          </svg>
                                          ينتهي الرمز خلال <strong>5 دقائق</strong>
                                        </div>
                                      </div>
                                      
                                      <div class="security-note">
                                        <div class="security-note-title">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#064d06" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                          </svg>
                                          ملاحظة أمنية
                                        </div>
                                        <p>إذا لم تقم بطلب إعادة تعيين كلمة المرور، يرجى تجاهل هذا البريد الإلكتروني أو التواصل فوراً مع فريق الدعم الفني لدينا.</p>
                                      </div>
                                    </div>
                                    
                                    <div class="email-footer">
                                      <div class="copyright">
                                        © ${new Date().getFullYear()} موقعك. جميع الحقوق محفوظة
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </body>
                            </html>
                            `,
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
