// function showNotification(message, type = "success") {
//   const existingNotifications = document.querySelectorAll(".notification");
//   existingNotifications.forEach((notification) => {
//     notification.classList.add("closing");
//     setTimeout(() => {
//       notification.remove();
//     }, 300);
//   });

//   const notification = document.createElement("div");
//   notification.className = `notification notification-${type}`;

//   let icon = "check-circle";
//   if (type === "error") icon = "exclamation-circle";
//   if (type === "info") icon = "info-circle";

//   notification.innerHTML = `
//     <div class="notification-content">
//       <i class="fas fa-${icon} notification-icon" aria-hidden="true"></i>
//       <span>${message}</span>
//     </div>
//     <span class="notification-close" aria-label="إغلاق">
//       <i class="fas fa-times" aria-hidden="true"></i>
//     </span>
//   `;

//   document.body.appendChild(notification);

//   const closeBtn = notification.querySelector(".notification-close");
//   closeBtn.addEventListener("click", () => {
//     notification.classList.add("closing");
//     setTimeout(() => {
//       notification.remove();
//     }, 300);
//   });

//   setTimeout(() => {
//     if (notification.parentNode) {
//       notification.classList.add("closing");
//       setTimeout(() => {
//         notification.remove();
//       }, 300);
//     }
//   }, 5000);
// }

// function setButtonLoading(btn, isLoading) {
//   if (isLoading) {
//     btn.classList.add("loading");
//     btn.disabled = true;
//   } else {
//     btn.classList.remove("loading");
//     btn.disabled = false;
//   }
// }

// function goToStep(currentStepId, nextStepId) {
//   const currentStep = document.getElementById(currentStepId);
//   const nextStep = document.getElementById(nextStepId);

//   currentStep.classList.add("step-exit");

//   setTimeout(() => {
//     currentStep.style.display = "none";
//     currentStep.classList.remove("step-exit");

//     nextStep.style.display = "block";
//     nextStep.classList.add("step-enter");

//     setTimeout(() => {
//       nextStep.classList.remove("step-enter");
//     }, 10);
//   }, 400);
// }

// function checkPasswordStrength(password) {
//   if (!password) {
//     return { percentage: 0, color: "#d32f2f", text: "قوة كلمة المرور" };
//   }

//   let strength = 0;
//   const regexes = [
//     /[a-z]/,
//     /[A-Z]/,
//     /[0-9]/,
//     /[^a-zA-Z0-9]/,
//   ];

//   // طول كلمة المرور
//   if (password.length >= 8) strength += 1;
//   if (password.length >= 12) strength += 1;

//   // فحص التنوع في كلمة المرور
//   regexes.forEach((regex) => {
//     if (regex.test(password)) strength += 1;
//   });

//   // تحديد النتيجة
//   if (strength < 2) {
//     return { percentage: 20, color: "#d32f2f", text: "ضعيفة جداً" };
//   } else if (strength < 4) {
//     return { percentage: 40, color: "#ff9800", text: "ضعيفة" };
//   } else if (strength < 6) {
//     return { percentage: 60, color: "#ffc107", text: "متوسطة" };
//   } else if (strength < 8) {
//     return { percentage: 80, color: "#8bc34a", text: "قوية" };
//   } else {
//     return { percentage: 100, color: "#4caf50", text: "قوية جداً" };
//   }
// }

// /**
//  * بدء العد التنازلي لإعادة إرسال رمز التحقق
//  * @param {number} seconds - عدد الثواني للعد التنازلي
//  */
// function startCountdown(seconds) {
//   let remainingSeconds = seconds;
//   resendCodeBtn.disabled = true;

//   const countdownInterval = setInterval(() => {
//     remainingSeconds--;

//     // تحديث العداد
//     const minutes = Math.floor(remainingSeconds / 60);
//     const secs = remainingSeconds % 60;
//     countdownTimer.textContent = `${minutes.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;

//     // إذا انتهى العد التنازلي
//     if (remainingSeconds <= 0) {
//       clearInterval(countdownInterval);
//       resendCodeBtn.disabled = false;
//       countdownTimer.textContent = "00:00";
//     }
//   }, 1000);
// }

// // ============= تهيئة تسجيل الدخول =============
// document.addEventListener("DOMContentLoaded", function () {
//   // تهيئة العناصر
//   const loginForm = document.getElementById("login-form");
//   const passwordToggle = document.getElementById("password-toggle");
//   const passwordField = document.getElementById("password");
//   const passwordIcon = document.getElementById("password-icon");
//   const btnGoogle = document.getElementById("google-login");
//   const btnDiscord = document.getElementById("discord-login");
//   const btnLogin = document.getElementById("login-button");
//   const forgotPasswordLink = document.getElementById("forgot-password");
//   const signupLink = document.getElementById("signup-link");

//   // ============= زر إظهار/إخفاء كلمة المرور =============
//   function togglePasswordVisibility() {
//     if (passwordField.type === "password") {
//       passwordField.type = "text";
//       passwordIcon.classList.remove("fa-eye");
//       passwordIcon.classList.add("fa-eye-slash");
//     } else {
//       passwordField.type = "password";
//       passwordIcon.classList.remove("fa-eye-slash");
//       passwordIcon.classList.add("fa-eye");
//     }
//   }

//   passwordToggle.addEventListener("click", togglePasswordVisibility);
//   passwordToggle.addEventListener("keydown", (e) => {
//     if (e.key === "Enter" || e.key === " ") {
//       e.preventDefault();
//       togglePasswordVisibility();
//     }
//   });

//   // ============= تقديم نموذج تسجيل الدخول =============
//   loginForm.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     // التحقق من صحة البريد الإلكتروني بتعبير منتظم بسيط
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       showNotification("يرجى إدخال بريد إلكتروني صالح", "error");
//       return;
//     }

//     // التحقق من طول كلمة المرور
//     if (password.length < 6) {
//       showNotification("يجب أن تكون كلمة المرور 6 أحرف على الأقل", "error");
//       return;
//     }

//     // إظهار حالة التحميل
//     setButtonLoading(btnLogin, true);

//     // محاكاة طلب تسجيل الدخول
//     setTimeout(() => {
//       // محاكاة استجابة ناجحة
//       showNotification("تم تسجيل الدخول بنجاح! جاري تحويلك...", "success");

//       // إعادة تعيين حالة الزر
//       setButtonLoading(btnLogin, false);

//       // إعادة توجيه المستخدم بعد فترة
//       setTimeout(() => {
//         console.log("إعادة التوجيه إلى لوحة التحكم");
//       }, 1500);
//     }, 1500);
//   });

//   // ============= تسجيل الدخول بواسطة طرف ثالث =============
//   // تسجيل الدخول باستخدام Google
//   btnGoogle.addEventListener("click", function () {
//     setButtonLoading(btnGoogle, true);

//     // محاكاة عملية تسجيل الدخول
//     setTimeout(() => {
//       showNotification("جاري تسجيل الدخول باستخدام Google...", "info");
//       setButtonLoading(btnGoogle, false);
//     }, 1000);
//   });

//   // تسجيل الدخول باستخدام Discord
//   btnDiscord.addEventListener("click", function () {
//     setButtonLoading(btnDiscord, true);

//     // محاكاة عملية تسجيل الدخول
//     setTimeout(() => {
//       showNotification("جاري تسجيل الدخول باستخدام Discord...", "info");
//       setButtonLoading(btnDiscord, false);
//     }, 1000);
//   });

//   // ============= رابط نسيت كلمة المرور =============
//   forgotPasswordLink.addEventListener("click", function (e) {
//     e.preventDefault();

//     // استخدام قيمة البريد الإلكتروني من نموذج تسجيل الدخول إذا كانت موجودة
//     const loginEmail = document.getElementById("email").value;
//     if (loginEmail) {
//       document.getElementById("recovery-email").value = loginEmail;
//     }

//     forgotPasswordModal.style.display = "block";
//   });

//   // ============= رابط إنشاء حساب جديد =============
//   signupLink.addEventListener("click", function (e) {
//     e.preventDefault();
//     showNotification("سيتم توجيهك إلى صفحة إنشاء حساب جديد...", "info");

//     // محاكاة إعادة التوجيه
//     setTimeout(() => {
//       // إعادة توجيه المستخدم إلى صفحة signup.html
//       window.location.href = "signup.html";
//     }, 1000);
//   });

//   // إضافة التركيز على البريد الإلكتروني عند تحميل الصفحة
//   document.getElementById("email").focus();

//   // ============= تحسين إمكانية الوصول =============
//   // إضافة تفاعلات لوحة المفاتيح لتحسين إمكانية الوصول
//   document.addEventListener("keydown", function (e) {
//     // تبديل رؤية كلمة المرور عند الضغط على Alt+P
//     if (e.altKey && e.key === "p") {
//       e.preventDefault();
//       togglePasswordVisibility();
//     }
//   });
// });

// // ============= نظام استعادة كلمة المرور =============
// // تهيئة العناصر
// const forgotPasswordModal = document.getElementById("forgot-password-modal");
// const modalClose = document.querySelector(".modal-close");
// const sendCodeBtn = document.getElementById("send-code-btn");
// const verifyCodeBtn = document.getElementById("verify-code-btn");
// const resetPasswordBtn = document.getElementById("reset-password-btn");
// const backToLoginBtn = document.getElementById("back-to-login-btn");
// const resendCodeBtn = document.getElementById("resend-code-btn");
// const countdownTimer = document.getElementById("countdown-timer");
// const verificationInputs = document.querySelectorAll(".verification-input");
// const newPasswordToggle = document.getElementById("new-password-toggle");
// const confirmPasswordToggle = document.getElementById("confirm-password-toggle");
// const newPasswordField = document.getElementById("new-password");
// const confirmPasswordField = document.getElementById("confirm-password");
// const newPasswordIcon = document.getElementById("new-password-icon");
// const confirmPasswordIcon = document.getElementById("confirm-password-icon");
// const strengthMeterFill = document.getElementById("strength-meter-fill");
// const strengthText = document.getElementById("strength-text");

// // ============= نافذة استعادة كلمة المرور =============
// // إغلاق النافذة عند النقر على X
// modalClose.addEventListener("click", function () {
//   forgotPasswordModal.style.display = "none";
// });

// // إغلاق النافذة عند النقر خارجها
// window.addEventListener("click", function (e) {
//   if (e.target === forgotPasswordModal) {
//     forgotPasswordModal.style.display = "none";
//   }
// });

// // ============= إرسال رمز التحقق =============

// sendCodeBtn.addEventListener("click", function () {
//   const email = document.getElementById("recovery-email").value;

//   // التحقق من صحة البريد الإلكتروني
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     showNotification("يرجى إدخال بريد إلكتروني صالح", "error");
//     return;
//   }

//   // توليد رمز تحقق عشوائي مكون من 6 أرقام
//   const verificationCode = Math.floor(
//     100000 + Math.random() * 900000
//   ).toString();

//   // إظهار حالة التحميل
//   setButtonLoading(sendCodeBtn, true);

//   // sendCodeBtn.textContent = "جاري الإرسال...";
//   sendCodeBtn.disabled = true;

//   // محاكاة إرسال رمز التحقق (سيتم استبداله بطلب حقيقي)
//   setTimeout(() => {
//     setButtonLoading(sendCodeBtn, false);
//     sendCodeBtn.textContent = "ارسال رمز التحقق";
//     sendCodeBtn.disabled = false;
//     showNotification("تم إرسال رمز التحقق إلى بريدك الإلكتروني: ", "success");
//     goToStep("step-email", "step-verify");

//     verificationInputs[0].focus();

//     // بدء العد التنازلي
//     startCountdown(5 * 60); // 5 دقائق
//   }, 1500);
// });

// // ============= التعامل مع إدخال رمز التحقق =============
// verificationInputs.forEach((input) => {
//   input.addEventListener("keyup", (e) => {
//     const index = parseInt(input.dataset.index);

//     // إذا تم إدخال رقم، انتقل إلى الحقل التالي
//     if (
//       input.value.length === input.maxLength &&
//       index < verificationInputs.length - 1
//     ) {
//       verificationInputs[index + 1].focus();
//     }

//     // رجوع إلى الحقل السابق عند الضغط على Backspace
//     if (e.key === "Backspace" && index > 0 && input.value.length === 0) {
//       verificationInputs[index - 1].focus();
//     }
//   });

//   // لضمان إدخال أرقام فقط
//   input.addEventListener("input", () => {
//     input.value = input.value.replace(/[^0-9]/g, "");
//   });
// });

// // ============= التحقق من رمز التحقق =============
// verifyCodeBtn.addEventListener("click", function () {
//   let verificationCode = "";
//   let isComplete = true;

//   // تجميع الرمز من الحقول الستة
//   verificationInputs.forEach((input) => {
//     verificationCode += input.value;
//     if (input.value.length === 0) {
//       isComplete = false;
//     }
//   });

//   if (!isComplete) {
//     showNotification("يرجى إدخال رمز التحقق كاملاً", "error");
//     return;
//   }

//   // إظهار حالة التحميل
//   setButtonLoading(verifyCodeBtn, true);

//   // محاكاة التحقق من الرمز (سيتم استبداله بطلب حقيقي)
//   setTimeout(() => {
//     setButtonLoading(verifyCodeBtn, false);

//     // افتراض أن الرمز "123456" صحيح (للتجربة فقط)
//     if (verificationCode === "123456") {
//       showNotification("تم التحقق من الرمز بنجاح", "success");
//       goToStep("step-verify", "step-reset");
//     } else {
//       showNotification("رمز التحقق غير صحيح", "error");
//     }
//   }, 1500);
// });

// // ============= إعادة إرسال رمز التحقق =============
// resendCodeBtn.addEventListener("click", function () {
//   if (resendCodeBtn.disabled) return;

//   const email = document.getElementById("recovery-email").value;

//   // إظهار حالة التحميل
//   resendCodeBtn.textContent = "جاري الإرسال...";
//   resendCodeBtn.disabled = true;

//   // محاكاة إعادة إرسال الرمز
//   setTimeout(() => {
//     resendCodeBtn.textContent = "إعادة إرسال الرمز";
//     showNotification("تم إرسال رمز تحقق جديد إلى بريدك الإلكتروني", "success");

//     // إعادة تعيين حقول الإدخال
//     verificationInputs.forEach((input) => {
//       input.value = "";
//     });
//     verificationInputs[0].focus();

//     // إعادة بدء العد التنازلي
//     startCountdown(5 * 60); // 5 دقائق
//   }, 1500);
// });

// // ============= تعيين كلمة المرور الجديدة =============
// // فحص قوة كلمة المرور
// newPasswordField.addEventListener("input", function () {
//   const password = newPasswordField.value;
//   const strength = checkPasswordStrength(password);

//   // تحديث مؤشر قوة كلمة المرور
//   strengthMeterFill.style.width = strength.percentage + "%";
//   strengthMeterFill.style.backgroundColor = strength.color;
//   strengthText.textContent = strength.text;
//   strengthText.style.color = strength.color;
// });

// // إظهار/إخفاء كلمة المرور الجديدة
// newPasswordToggle.addEventListener("click", function () {
//   if (newPasswordField.type === "password") {
//     newPasswordField.type = "text";
//     newPasswordIcon.classList.remove("fa-eye");
//     newPasswordIcon.classList.add("fa-eye-slash");
//   } else {
//     newPasswordField.type = "password";
//     newPasswordIcon.classList.remove("fa-eye-slash");
//     newPasswordIcon.classList.add("fa-eye");
//   }
// });

// // إظهار/إخفاء تأكيد كلمة المرور
// confirmPasswordToggle.addEventListener("click", function () {
//   if (confirmPasswordField.type === "password") {
//     confirmPasswordField.type = "text";
//     confirmPasswordIcon.classList.remove("fa-eye");
//     confirmPasswordIcon.classList.add("fa-eye-slash");
//   } else {
//     confirmPasswordField.type = "password";
//     confirmPasswordIcon.classList.remove("fa-eye-slash");
//     confirmPasswordIcon.classList.add("fa-eye");
//   }
// });

// // إعادة تعيين كلمة المرور
// resetPasswordBtn.addEventListener("click", function () {
//   const newPassword = newPasswordField.value;
//   const confirmPassword = confirmPasswordField.value;

//   if (newPassword.length < 8) {
//     showNotification("يجب أن تكون كلمة المرور 8 أحرف على الأقل", "error");
//     return;
//   }

//   if (newPassword !== confirmPassword) {
//     showNotification("كلمتا المرور غير متطابقتين", "error");
//     return;
//   }

//   // إظهار حالة التحميل
//   setButtonLoading(resetPasswordBtn, true);

//   // محاكاة إعادة تعيين كلمة المرور (سيتم استبداله بطلب حقيقي)
//   setTimeout(() => {
//     setButtonLoading(resetPasswordBtn, false);
//     showNotification("تم إعادة تعيين كلمة المرور بنجاح", "success");

//     // الانتقال إلى شاشة النجاح
//     goToStep("step-reset", "step-success");
//   }, 1500);
// });

// // العودة إلى شاشة تسجيل الدخول
// backToLoginBtn.addEventListener("click", function () {
//   forgotPasswordModal.style.display = "none";

//   // وضع البريد الإلكتروني في نموذج تسجيل الدخول
//   const email = document.getElementById("recovery-email").value;
//   if (email) {
//     document.getElementById("email").value = email;
//     document.getElementById("password").focus();
//   }

//   showNotification(
//     "يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة",
//     "info"
//   );
// });













































































function showNotification(message, type = "success") {
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => {
    notification.classList.add("closing");
    setTimeout(() => {
      notification.remove();
    }, 300);
  });

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;

  let icon = "check-circle";
  if (type === "error") icon = "exclamation-circle";
  if (type === "info") icon = "info-circle";

  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${icon} notification-icon" aria-hidden="true"></i>
      <span>${message}</span>
    </div>
    <span class="notification-close" aria-label="إغلاق">
      <i class="fas fa-times" aria-hidden="true"></i>
    </span>
  `;

  document.body.appendChild(notification);

  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.classList.add("closing");
    setTimeout(() => {
      notification.remove();
    }, 300);
  });

  setTimeout(() => {
    if (notification.parentNode) {
      notification.classList.add("closing");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }
  }, 5000);
}

function setButtonLoading(btn, isLoading) {
  if (isLoading) {
    btn.classList.add("loading");
    btn.disabled = true;
  } else {
    btn.classList.remove("loading");
    btn.disabled = false;
  }
}

function goToStep(currentStepId, nextStepId) {
  const currentStep = document.getElementById(currentStepId);
  const nextStep = document.getElementById(nextStepId);

  currentStep.classList.add("step-exit");

  setTimeout(() => {
    currentStep.style.display = "none";
    currentStep.classList.remove("step-exit");

    nextStep.style.display = "block";
    nextStep.classList.add("step-enter");

    setTimeout(() => {
      nextStep.classList.remove("step-enter");
    }, 10);
  }, 400);
}

function checkPasswordStrength(password) {
  if (!password) {
    return { percentage: 0, color: "#d32f2f", text: "قوة كلمة المرور" };
  }

  let strength = 0;
  const regexes = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/];

  // طول كلمة المرور
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;

  // فحص التنوع في كلمة المرور
  regexes.forEach((regex) => {
    if (regex.test(password)) strength += 1;
  });

  // تحديد النتيجة
  if (strength < 2) {
    return { percentage: 20, color: "#d32f2f", text: "ضعيفة جداً" };
  } else if (strength < 4) {
    return { percentage: 40, color: "#ff9800", text: "ضعيفة" };
  } else if (strength < 6) {
    return { percentage: 60, color: "#ffc107", text: "متوسطة" };
  } else if (strength < 8) {
    return { percentage: 80, color: "#8bc34a", text: "قوية" };
  } else {
    return { percentage: 100, color: "#4caf50", text: "قوية جداً" };
  }
}

/**
 * بدء العد التنازلي لإعادة إرسال رمز التحقق
 * @param {number} seconds - عدد الثواني للعد التنازلي
 */
function startCountdown(seconds) {
  let remainingSeconds = seconds;
  resendCodeBtn.disabled = true;

  const countdownInterval = setInterval(() => {
    remainingSeconds--;

    // تحديث العداد
    const minutes = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    countdownTimer.textContent = `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;

    // إذا انتهى العد التنازلي
    if (remainingSeconds <= 0) {
      clearInterval(countdownInterval);
      resendCodeBtn.disabled = false;
      countdownTimer.textContent = "00:00";
    }
  }, 1000);
}

// ============= تهيئة تسجيل الدخول =============
document.addEventListener("DOMContentLoaded", function () {
  // تهيئة العناصر
  const loginForm = document.getElementById("login-form");
  const passwordToggle = document.getElementById("password-toggle");
  const passwordField = document.getElementById("password");
  const passwordIcon = document.getElementById("password-icon");
  const btnGoogle = document.getElementById("google-login");
  const btnDiscord = document.getElementById("discord-login");
  const btnLogin = document.getElementById("login-button");
  const forgotPasswordLink = document.getElementById("forgot-password");
  const signupLink = document.getElementById("signup-link");
  const verifyEmailDiv = document.getElementById("verify-email-section");
  const resendVerificationBtn = document.getElementById(
    "resend-verification-btn"
  );

  // ============= زر إظهار/إخفاء كلمة المرور =============
  function togglePasswordVisibility() {
    if (passwordField.type === "password") {
      passwordField.type = "text";
      passwordIcon.classList.remove("fa-eye");
      passwordIcon.classList.add("fa-eye-slash");
    } else {
      passwordField.type = "password";
      passwordIcon.classList.remove("fa-eye-slash");
      passwordIcon.classList.add("fa-eye");
    }
  }

  passwordToggle.addEventListener("click", togglePasswordVisibility);
  passwordToggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      togglePasswordVisibility();
    }
  });

  // ============= تقديم نموذج تسجيل الدخول =============
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const usernameOrEmail = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // التحقق من وجود البريد الإلكتروني/اسم المستخدم وكلمة المرور
    if (!usernameOrEmail || !password) {
      showNotification("يرجى إدخال جميع البيانات المطلوبة", "error");
      return;
    }

    // التحقق من طول كلمة المرور
    if (password.length < 8) {
      showNotification("يجب أن تكون كلمة المرور 8 أحرف على الأقل", "error");
      return;
    }

    // إظهار حالة التحميل
    setButtonLoading(btnLogin, true);

    // إرسال طلب تسجيل الدخول إلى الخادم
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameOrEmail,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setButtonLoading(btnLogin, false);

        if (data.success) {
          // تخزين بيانات المستخدم في localStorage للحفاظ على حالة الجلسة
          localStorage.setItem("user", JSON.stringify(data.user));

          showNotification("تم تسجيل الدخول بنجاح! جاري تحويلك...", "success");

          // إعادة توجيه المستخدم إلى لوحة التحكم بعد فترة
          setTimeout(() => {
            window.location.href = "/dashboard.html";
          }, 1500);
        } else {
          // إظهار حالة الخطأ
          if (data.requiresVerification) {
            // إذا كان المستخدم غير مفعّل، إظهار قسم إعادة إرسال رابط التفعيل
            if (verifyEmailDiv) {
              verifyEmailDiv.style.display = "block";
              // تخزين البريد الإلكتروني للاستخدام في إعادة إرسال رابط التفعيل
              sessionStorage.setItem(
                "pendingVerificationEmail",
                usernameOrEmail
              );
            }
            showNotification(
              "يرجى تفعيل حسابك عبر البريد الإلكتروني قبل تسجيل الدخول",
              "error"
            );
          } else {
            showNotification(
              data.message || "فشل تسجيل الدخول، تأكد من البيانات المدخلة",
              "error"
            );
          }
        }
      })
      .catch((error) => {
        setButtonLoading(btnLogin, false);
        showNotification("حدث خطأ أثناء محاولة الاتصال بالخادم", "error");
        console.error("خطأ في تسجيل الدخول:", error);
      });
  });

  // ============= إعادة إرسال بريد التحقق =============
  if (resendVerificationBtn) {
    resendVerificationBtn.addEventListener("click", function () {
      const email = sessionStorage.getItem("pendingVerificationEmail");

      if (!email) {
        showNotification("يرجى إدخال بريد إلكتروني صالح أولاً", "error");
        return;
      }

      setButtonLoading(resendVerificationBtn, true);

      // إرسال طلب إعادة إرسال رابط التفعيل
      fetch("/api/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((response) => response.json())
        .then((data) => {
          setButtonLoading(resendVerificationBtn, false);

          if (data.success) {
            showNotification(
              "تم إعادة إرسال رابط التفعيل إلى بريدك الإلكتروني",
              "success"
            );
          } else {
            showNotification(
              data.message || "فشل إعادة إرسال رابط التفعيل",
              "error"
            );
          }
        })
        .catch((error) => {
          setButtonLoading(resendVerificationBtn, false);
          showNotification("حدث خطأ أثناء محاولة الاتصال بالخادم", "error");
          console.error("خطأ في إعادة إرسال رابط التفعيل:", error);
        });
    });
  }

  // ============= تسجيل الدخول بواسطة طرف ثالث =============
  // تسجيل الدخول باستخدام Google
  btnGoogle.addEventListener("click", function () {
    setButtonLoading(btnGoogle, true);

    // محاكاة عملية تسجيل الدخول
    setTimeout(() => {
      showNotification("جاري تسجيل الدخول باستخدام Google...", "info");
      setButtonLoading(btnGoogle, false);
    }, 1000);
  });

  // تسجيل الدخول باستخدام Discord
  btnDiscord.addEventListener("click", function () {
    setButtonLoading(btnDiscord, true);

    // محاكاة عملية تسجيل الدخول
    setTimeout(() => {
      showNotification("جاري تسجيل الدخول باستخدام Discord...", "info");
      setButtonLoading(btnDiscord, false);
    }, 1000);
  });

  // ============= رابط نسيت كلمة المرور =============
  forgotPasswordLink.addEventListener("click", function (e) {
    e.preventDefault();

    // استخدام قيمة البريد الإلكتروني من نموذج تسجيل الدخول إذا كانت موجودة
    const loginEmail = document.getElementById("email").value;
    if (loginEmail) {
      document.getElementById("recovery-email").value = loginEmail;
    }

    forgotPasswordModal.style.display = "block";
  });

  // ============= رابط إنشاء حساب جديد =============
  signupLink.addEventListener("click", function (e) {
    e.preventDefault();
    showNotification("سيتم توجيهك إلى صفحة إنشاء حساب جديد...", "info");

    // إعادة توجيه المستخدم إلى صفحة signup.html
    setTimeout(() => {
      window.location.href = "signup.html";
    }, 1000);
  });

  // إضافة التركيز على البريد الإلكتروني عند تحميل الصفحة
  document.getElementById("email").focus();

  // ============= تحسين إمكانية الوصول =============
  // إضافة تفاعلات لوحة المفاتيح لتحسين إمكانية الوصول
  document.addEventListener("keydown", function (e) {
    // تبديل رؤية كلمة المرور عند الضغط على Alt+P
    if (e.altKey && e.key === "p") {
      e.preventDefault();
      togglePasswordVisibility();
    }
  });

  // ============= التحقق من حالة URL للتحقق من الرسائل =============
  // التحقق من رابط الصفحة لمعرفة إذا كان هناك رسالة يجب عرضها
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.get("verified") === "true") {
    showNotification(
      "تم تفعيل حسابك بنجاح! يمكنك الآن تسجيل الدخول",
      "success"
    );
  }

  if (urlParams.get("error") === "invalid_token") {
    showNotification("رابط التفعيل غير صالح أو منتهي الصلاحية", "error");
  }

  if (urlParams.get("error") === "server_error") {
    showNotification("حدث خطأ في الخادم أثناء تفعيل حسابك", "error");
  }
});

// ============= نظام استعادة كلمة المرور =============
// تهيئة العناصر
const forgotPasswordModal = document.getElementById("forgot-password-modal");
const modalClose = document.querySelector(".modal-close");
const sendCodeBtn = document.getElementById("send-code-btn");
const verifyCodeBtn = document.getElementById("verify-code-btn");
const resetPasswordBtn = document.getElementById("reset-password-btn");
const backToLoginBtn = document.getElementById("back-to-login-btn");
const resendCodeBtn = document.getElementById("resend-code-btn");
const countdownTimer = document.getElementById("countdown-timer");
const verificationInputs = document.querySelectorAll(".verification-input");
const newPasswordToggle = document.getElementById("new-password-toggle");
const confirmPasswordToggle = document.getElementById(
  "confirm-password-toggle"
);
const newPasswordField = document.getElementById("new-password");
const confirmPasswordField = document.getElementById("confirm-password");
const newPasswordIcon = document.getElementById("new-password-icon");
const confirmPasswordIcon = document.getElementById("confirm-password-icon");
const strengthMeterFill = document.getElementById("strength-meter-fill");
const strengthText = document.getElementById("strength-text");

// ============= نافذة استعادة كلمة المرور =============
// إغلاق النافذة عند النقر على X
modalClose.addEventListener("click", function () {
  forgotPasswordModal.style.display = "none";
});

// إغلاق النافذة عند النقر خارجها
window.addEventListener("click", function (e) {
  if (e.target === forgotPasswordModal) {
    forgotPasswordModal.style.display = "none";
  }
});

// ============= إرسال رمز التحقق =============
sendCodeBtn.addEventListener("click", function () {
  const email = document.getElementById("recovery-email").value;

  // التحقق من صحة البريد الإلكتروني
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showNotification("يرجى إدخال بريد إلكتروني صالح", "error");
    return;
  }

  // إظهار حالة التحميل
  setButtonLoading(sendCodeBtn, true);

  // إرسال طلب للحصول على رمز إعادة تعيين كلمة المرور
  fetch("/api/send-verification-code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => response.json())
    .then((data) => {
      setButtonLoading(sendCodeBtn, false);

      if (data.success) {
        showNotification("تم إرسال رمز التحقق إلى بريدك الإلكتروني", "success");
        goToStep("step-email", "step-verify");
        verificationInputs[0].focus();

        // بدء العد التنازلي
        startCountdown(5 * 60); // 5 دقائق
      } else {
        showNotification(data.message || "فشل في إرسال رمز التحقق", "error");
      }
    })
    .catch((error) => {
      setButtonLoading(sendCodeBtn, false);
      showNotification("حدث خطأ أثناء محاولة الاتصال بالخادم", "error");
      console.error("خطأ في إرسال رمز التحقق:", error);
    });
});

// ============= التعامل مع إدخال رمز التحقق =============
verificationInputs.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    const index = parseInt(input.dataset.index);

    // إذا تم إدخال رقم، انتقل إلى الحقل التالي
    if (
      input.value.length === input.maxLength &&
      index < verificationInputs.length - 1
    ) {
      verificationInputs[index + 1].focus();
    }

    // رجوع إلى الحقل السابق عند الضغط على Backspace
    if (e.key === "Backspace" && index > 0 && input.value.length === 0) {
      verificationInputs[index - 1].focus();
    }
  });

  // لضمان إدخال أرقام فقط
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^0-9]/g, "");
  });
});

// ============= التحقق من رمز التحقق =============
verifyCodeBtn.addEventListener("click", function () {
  let verificationCode = "";
  let isComplete = true;

  // تجميع الرمز من الحقول الستة
  verificationInputs.forEach((input) => {
    verificationCode += input.value;
    if (input.value.length === 0) {
      isComplete = false;
    }
  });

  if (!isComplete) {
    showNotification("يرجى إدخال رمز التحقق كاملاً", "error");
    return;
  }

  // إظهار حالة التحميل
  setButtonLoading(verifyCodeBtn, true);

  // هنا يمكن إضافة API للتحقق من الرمز
  // حاليًا نستخدم محاكاة للتحقق
  setTimeout(() => {
    setButtonLoading(verifyCodeBtn, false);

    // التحقق من الرمز (يمكن استبداله بطلب API حقيقي)
    if (verificationCode === "123456") {
      showNotification("تم التحقق من الرمز بنجاح", "success");
      goToStep("step-verify", "step-reset");
    } else {
      showNotification("رمز التحقق غير صحيح", "error");
    }
  }, 1500);
});

// ============= إعادة إرسال رمز التحقق =============
resendCodeBtn.addEventListener("click", function () {
  if (resendCodeBtn.disabled) return;

  const email = document.getElementById("recovery-email").value;

  // إظهار حالة التحميل
  resendCodeBtn.disabled = true;
  resendCodeBtn.textContent = "جاري الإرسال...";

  // إعادة إرسال طلب للحصول على رمز إعادة تعيين كلمة المرور
  fetch("/api/send-verification-code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => response.json())
    .then((data) => {
      resendCodeBtn.textContent = "إعادة إرسال الرمز";

      if (data.success) {
        showNotification(
          "تم إرسال رمز تحقق جديد إلى بريدك الإلكتروني",
          "success"
        );

        // إعادة تعيين حقول الإدخال
        verificationInputs.forEach((input) => {
          input.value = "";
        });
        verificationInputs[0].focus();

        // إعادة بدء العد التنازلي
        startCountdown(5 * 60); // 5 دقائق
      } else {
        showNotification(data.message || "فشل في إرسال رمز التحقق", "error");
        resendCodeBtn.disabled = false;
      }
    })
    .catch((error) => {
      resendCodeBtn.textContent = "إعادة إرسال الرمز";
      resendCodeBtn.disabled = false;
      showNotification("حدث خطأ أثناء محاولة الاتصال بالخادم", "error");
      console.error("خطأ في إعادة إرسال رمز التحقق:", error);
    });
});

// ============= تعيين كلمة المرور الجديدة =============
// فحص قوة كلمة المرور
newPasswordField.addEventListener("input", function () {
  const password = newPasswordField.value;
  const strength = checkPasswordStrength(password);

  // تحديث مؤشر قوة كلمة المرور
  strengthMeterFill.style.width = strength.percentage + "%";
  strengthMeterFill.style.backgroundColor = strength.color;
  strengthText.textContent = strength.text;
  strengthText.style.color = strength.color;
});

// إظهار/إخفاء كلمة المرور الجديدة
newPasswordToggle.addEventListener("click", function () {
  if (newPasswordField.type === "password") {
    newPasswordField.type = "text";
    newPasswordIcon.classList.remove("fa-eye");
    newPasswordIcon.classList.add("fa-eye-slash");
  } else {
    newPasswordField.type = "password";
    newPasswordIcon.classList.remove("fa-eye-slash");
    newPasswordIcon.classList.add("fa-eye");
  }
});

// إظهار/إخفاء تأكيد كلمة المرور
confirmPasswordToggle.addEventListener("click", function () {
  if (confirmPasswordField.type === "password") {
    confirmPasswordField.type = "text";
    confirmPasswordIcon.classList.remove("fa-eye");
    confirmPasswordIcon.classList.add("fa-eye-slash");
  } else {
    confirmPasswordField.type = "password";
    confirmPasswordIcon.classList.remove("fa-eye-slash");
    confirmPasswordIcon.classList.add("fa-eye");
  }
});

// إعادة تعيين كلمة المرور
resetPasswordBtn.addEventListener("click", function () {
  const newPassword = newPasswordField.value;
  const confirmPassword = confirmPasswordField.value;
  const email = document.getElementById("recovery-email").value;
  const code = verificationInputs.map((input) => input.value).join("");

  if (newPassword.length < 8) {
    showNotification("يجب أن تكون كلمة المرور 8 أحرف على الأقل", "error");
    return;
  }

  if (newPassword !== confirmPassword) {
    showNotification("كلمتا المرور غير متطابقتين", "error");
    return;
  }

  // إظهار حالة التحميل
  setButtonLoading(resetPasswordBtn, true);

  // هنا يمكن إضافة API لإعادة تعيين كلمة المرور
  // حاليًا نستخدم محاكاة للعملية
  setTimeout(() => {
    setButtonLoading(resetPasswordBtn, false);
    showNotification("تم إعادة تعيين كلمة المرور بنجاح", "success");

    // الانتقال إلى شاشة النجاح
    goToStep("step-reset", "step-success");
  }, 1500);
});

// العودة إلى شاشة تسجيل الدخول
backToLoginBtn.addEventListener("click", function () {
  forgotPasswordModal.style.display = "none";

  // وضع البريد الإلكتروني في نموذج تسجيل الدخول
  const email = document.getElementById("recovery-email").value;
  if (email) {
    document.getElementById("email").value = email;
    document.getElementById("password").focus();
  }

  showNotification(
    "يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة",
    "info"
  );
});