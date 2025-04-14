const { transporter } = require("../config/email");

const sendVerificationEmail = async (user, verificationToken) => {
  const verificationUrl = `${
    process.env.BASE_URL || "http://localhost:5500"
  }/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: `"نظام الأمان - موقعك" <${
      process.env.EMAIL_USER || "your-email@gmail.com"
    }>`,
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
    console.log("✅ Email verification sent successfully");
    return true;
  } catch (error) {
    console.error("❌ Error sending email verification:", error);
    return false;
  }
};

const sendResetCode = async (user, code) => {
  const mailOptions = {
    from: `"نظام الأمان - موقعك" <${
      process.env.EMAIL_USER || "your-email@gmail.com"
    }>`,
    to: user.email,
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
                    <circle cx="12" cy="12" r="10"></circle>
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

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Verification code sent successfully");
    return true;
  } catch (error) {
    console.error("❌ Error sending verification code:", error);
    return false;
  }
};

module.exports = {
  sendVerificationEmail,
  sendResetCode,
};
