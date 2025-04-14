// document.addEventListener("DOMContentLoaded", function () {
//   // تهيئة العناصر
//   const signupForm = document.getElementById("signup-form");
//   const passwordField = document.getElementById("password");
//   const confirmPasswordField = document.getElementById("confirm-password");
//   const passwordToggle = document.getElementById("password-toggle");
//   const confirmPasswordToggle = document.getElementById(
//     "confirm-password-toggle"
//   );
//   const passwordIcon = document.getElementById("password-icon");
//   const confirmPasswordIcon = document.getElementById("confirm-password-icon");
//   const passwordMeter = document.getElementById("password-meter");
//   const passwordStrengthText = document.getElementById(
//     "password-strength-text"
//   );
//   const btnGoogle = document.getElementById("google-signup");
//   const btnDiscord = document.getElementById("discord-signup");
//   const btnSignup = document.getElementById("signup-button");
//   const loginLink = document.getElementById("login-link");

//   // ============= زر إظهار/إخفاء كلمة المرور =============
//   function togglePasswordVisibility(field, icon) {
//     if (field.type === "password") {
//       field.type = "text";
//       icon.classList.remove("fa-eye");
//       icon.classList.add("fa-eye-slash");
//     } else {
//       field.type = "password";
//       icon.classList.remove("fa-eye-slash");
//       icon.classList.add("fa-eye");
//     }
//   }

//   passwordToggle.addEventListener("click", () => {
//     togglePasswordVisibility(passwordField, passwordIcon);
//   });

//   confirmPasswordToggle.addEventListener("click", () => {
//     togglePasswordVisibility(confirmPasswordField, confirmPasswordIcon);
//   });

//   // ============= التحقق من قوة كلمة المرور =============
//   passwordField.addEventListener("input", function () {
//     const password = this.value;
//     let strength = 0;
//     let strengthText = "";

//     if (password.length > 0) {
//       // التحقق من الطول
//       if (password.length >= 8) strength += 25;

//       // التحقق من وجود أحرف كبيرة وصغيرة
//       if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;

//       // التحقق من وجود أرقام
//       if (/\d/.test(password)) strength += 25;

//       // التحقق من وجود أحرف خاصة
//       if (/[^a-zA-Z0-9]/.test(password)) strength += 25;

//       // تحديد وصف قوة كلمة المرور
//       if (strength <= 25) {
//         strengthText = "ضعيفة جداً";
//         passwordMeter.style.backgroundColor = "#ff3e36";
//       } else if (strength <= 50) {
//         strengthText = "ضعيفة";
//         passwordMeter.style.backgroundColor = "#ff691f";
//       } else if (strength <= 75) {
//         strengthText = "متوسطة";
//         passwordMeter.style.backgroundColor = "#ffda36";
//       } else {
//         strengthText = "قوية";
//         passwordMeter.style.backgroundColor = "#0bac0b";
//       }
//     } else {
//       strengthText = "قوة كلمة المرور";
//     }

//     // تحديث مؤشر قوة كلمة المرور والنص
//     passwordMeter.style.width = strength + "%";
//     passwordStrengthText.textContent = strengthText;

//     // تغيير لون النص حسب القوة
//     if (strength > 0) {
//       passwordStrengthText.style.color = passwordMeter.style.backgroundColor;
//     } else {
//       passwordStrengthText.style.color = "#b8b8b8";
//     }
//   });

//   // ============= وظيفة إظهار الإشعارات =============
//   function showNotification(message, type = "success") {
//     // إزالة أي إشعارات موجودة
//     const existingNotifications = document.querySelectorAll(".notification");
//     existingNotifications.forEach((notification) => {
//       notification.classList.add("closing");
//       setTimeout(() => {
//         notification.remove();
//       }, 300);
//     });

//     // إنشاء إشعار جديد
//     const notification = document.createElement("div");
//     notification.className = `notification notification-${type}`;

//     let icon = "check-circle";
//     if (type === "error") icon = "exclamation-circle";
//     if (type === "info") icon = "info-circle";

//     notification.innerHTML = `
//             <div class="notification-content">
//               <i class="fas fa-${icon} notification-icon" aria-hidden="true"></i>
//               <span>${message}</span>
//             </div>
//             <span class="notification-close" aria-label="إغلاق">
//               <i class="fas fa-times" aria-hidden="true"></i>
//             </span>
//           `;

//     document.body.appendChild(notification);

//     // إضافة مستمع نقر لزر الإغلاق
//     const closeBtn = notification.querySelector(".notification-close");
//     closeBtn.addEventListener("click", () => {
//       notification.classList.add("closing");
//       setTimeout(() => {
//         notification.remove();
//       }, 300);
//     });

//     // إخفاء الإشعار تلقائيًا بعد 5 ثوان
//     setTimeout(() => {
//       if (notification.parentNode) {
//         notification.classList.add("closing");
//         setTimeout(() => {
//           notification.remove();
//         }, 300);
//       }
//     }, 5000);
//   }

//   // وظيفة إظهار حالة التحميل
//   function setButtonLoading(btn, isLoading) {
//     if (isLoading) {
//       btn.classList.add("loading");
//       btn.disabled = true;
//     } else {
//       btn.classList.remove("loading");
//       btn.disabled = false;
//     }
//   }

//   // تقديم نموذج التسجيل
//   signupForm.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const firstName = document.getElementById("firstName").value;
//     const lastName = document.getElementById("lastName").value;
//     const email = document.getElementById("email").value;
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;
//     const confirmPassword = document.getElementById("confirm-password").value;
//     const termsChecked = document.getElementById("terms").checked;

//     // التحقق من صحة البريد الإلكتروني بتعبير منتظم
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       showNotification("يرجى إدخال بريد إلكتروني صالح", "error");
//       return;
//     }

//     // التحقق من طول كلمة المرور
//     if (password.length < 8) {
//       showNotification("يجب أن تكون كلمة المرور 8 أحرف على الأقل", "error");
//       return;
//     }

//     // التحقق من تطابق كلمات المرور
//     if (password !== confirmPassword) {
//       showNotification("كلمات المرور غير متطابقة", "error");
//       return;
//     }

//     // التحقق من قوة كلمة المرور
//     let passwordScore = 0;
//     if (password.length >= 8) passwordScore += 1;
//     if (/[a-z]/.test(password) && /[A-Z]/.test(password)) passwordScore += 1;
//     if (/\d/.test(password)) passwordScore += 1;
//     if (/[^a-zA-Z0-9]/.test(password)) passwordScore += 1;

//     if (passwordScore < 3) {
//       showNotification(
//         "يرجى اختيار كلمة مرور أقوى تحتوي على أحرف كبيرة وصغيرة وأرقام ورموز",
//         "error"
//       );
//       return;
//     }

//     // التحقق من الموافقة على الشروط
//     if (!termsChecked) {
//       showNotification("يجب الموافقة على الشروط والأحكام للمتابعة", "error");
//       return;
//     }

//     // إظهار حالة التحميل
//     setButtonLoading(btnSignup, true);

//     // محاكاة طلب التسجيل
//     setTimeout(() => {
//       // محاكاة استجابة ناجحة
//       showNotification("تم إنشاء حسابك بنجاح! جاري تحويلك...", "success");

//       // إعادة تعيين حالة الزر
//       setButtonLoading(btnSignup, false);

//       // إعادة توجيه المستخدم بعد فترة
//       setTimeout(() => {
//         console.log("إعادة التوجيه إلى صفحة تسجيل الدخول");
//       }, 1500);
//     }, 1500);
//   });

//   // التسجيل باستخدام Google
//   btnGoogle.addEventListener("click", function () {
//     setButtonLoading(btnGoogle, true);

//     // محاكاة عملية التسجيل
//     setTimeout(() => {
//       showNotification("جاري التسجيل باستخدام Google...", "info");
//       setButtonLoading(btnGoogle, false);
//     }, 1000);
//   });

//   // التسجيل باستخدام Discord
//   btnDiscord.addEventListener("click", function () {
//     setButtonLoading(btnDiscord, true);

//     // محاكاة عملية التسجيل
//     setTimeout(() => {
//       showNotification("جاري التسجيل باستخدام Discord...", "info");
//       setButtonLoading(btnDiscord, false);
//     }, 1000);
//   });

//   // رابط تسجيل الدخول
//   loginLink.addEventListener("click", function (e) {
//     e.preventDefault();
//     showNotification("سيتم توجيهك إلى صفحة تسجيل الدخول...", "info");

//     // محاكاة إعادة التوجيه
//     setTimeout(() => {
//         window.location.href = "login.html";
//     }, 1000);
//   });

//   // إضافة التركيز على الاسم الأول عند تحميل الصفحة
//   document.getElementById("firstName").focus();

//   // إضافة تفاعلات لوحة المفاتيح لتحسين تجربة المستخدم
//   document.addEventListener("keydown", function (e) {
//     // تبديل رؤية كلمة المرور عند الضغط على Alt+P
//     if (e.altKey && e.key === "p") {
//       e.preventDefault();
//       togglePasswordVisibility();
//     }
//   });
// });












document.addEventListener("DOMContentLoaded", function () {
  // تهيئة العناصر
  const signupForm = document.getElementById("signup-form");
  const passwordField = document.getElementById("password");
  const confirmPasswordField = document.getElementById("confirm-password");
  const passwordToggle = document.getElementById("password-toggle");
  const confirmPasswordToggle = document.getElementById(
    "confirm-password-toggle"
  );
  const passwordIcon = document.getElementById("password-icon");
  const confirmPasswordIcon = document.getElementById("confirm-password-icon");
  const passwordMeter = document.getElementById("password-meter");
  const passwordStrengthText = document.getElementById(
    "password-strength-text"
  );
  const btnGoogle = document.getElementById("google-signup");
  const btnDiscord = document.getElementById("discord-signup");
  const btnSignup = document.getElementById("signup-button");
  const loginLink = document.getElementById("login-link");

  // الرابط الأساسي للـ API
  const API_BASE_URL = "http://localhost:5500/api";

  // ============= زر إظهار/إخفاء كلمة المرور =============
  function togglePasswordVisibility(field, icon) {
    if (field.type === "password") {
      field.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      field.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  }

  passwordToggle.addEventListener("click", () => {
    togglePasswordVisibility(passwordField, passwordIcon);
  });

  confirmPasswordToggle.addEventListener("click", () => {
    togglePasswordVisibility(confirmPasswordField, confirmPasswordIcon);
  });

  // ============= التحقق من قوة كلمة المرور =============
  passwordField.addEventListener("input", function () {
    const password = this.value;
    let strength = 0;
    let strengthText = "";

    if (password.length > 0) {
      // التحقق من الطول
      if (password.length >= 8) strength += 25;

      // التحقق من وجود أحرف كبيرة وصغيرة
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;

      // التحقق من وجود أرقام
      if (/\d/.test(password)) strength += 25;

      // التحقق من وجود أحرف خاصة
      if (/[^a-zA-Z0-9]/.test(password)) strength += 25;

      // تحديد وصف قوة كلمة المرور
      if (strength <= 25) {
        strengthText = "ضعيفة جداً";
        passwordMeter.style.backgroundColor = "#ff3e36";
      } else if (strength <= 50) {
        strengthText = "ضعيفة";
        passwordMeter.style.backgroundColor = "#ff691f";
      } else if (strength <= 75) {
        strengthText = "متوسطة";
        passwordMeter.style.backgroundColor = "#ffda36";
      } else {
        strengthText = "قوية";
        passwordMeter.style.backgroundColor = "#0bac0b";
      }
    } else {
      strengthText = "قوة كلمة المرور";
    }

    // تحديث مؤشر قوة كلمة المرور والنص
    passwordMeter.style.width = strength + "%";
    passwordStrengthText.textContent = strengthText;

    // تغيير لون النص حسب القوة
    if (strength > 0) {
      passwordStrengthText.style.color = passwordMeter.style.backgroundColor;
    } else {
      passwordStrengthText.style.color = "#b8b8b8";
    }
  });

  // ============= وظيفة إظهار الإشعارات =============
  function showNotification(message, type = "success") {
    // إزالة أي إشعارات موجودة
    const existingNotifications = document.querySelectorAll(".notification");
    existingNotifications.forEach((notification) => {
      notification.classList.add("closing");
      setTimeout(() => {
        notification.remove();
      }, 300);
    });

    // إنشاء إشعار جديد
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

    // إضافة مستمع نقر لزر الإغلاق
    const closeBtn = notification.querySelector(".notification-close");
    closeBtn.addEventListener("click", () => {
      notification.classList.add("closing");
      setTimeout(() => {
        notification.remove();
      }, 300);
    });

    // إخفاء الإشعار تلقائيًا بعد 5 ثوان
    setTimeout(() => {
      if (notification.parentNode) {
        notification.classList.add("closing");
        setTimeout(() => {
          notification.remove();
        }, 300);
      }
    }, 5000);
  }

  // وظيفة إظهار حالة التحميل
  function setButtonLoading(btn, isLoading) {
    if (isLoading) {
      btn.classList.add("loading");
      btn.disabled = true;
    } else {
      btn.classList.remove("loading");
      btn.disabled = false;
    }
  }

  // وظيفة التحقق من صحة البيانات المدخلة
  function validateForm(userData) {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      confirmPassword,
      termsChecked,
    } = userData;

    // التحقق من الحقول المطلوبة
    if (!firstName || !lastName || !email || !username || !password) {
      showNotification("جميع الحقول مطلوبة", "error");
      return false;
    }

    // التحقق من صحة البريد الإلكتروني بتعبير منتظم
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification("يرجى إدخال بريد إلكتروني صالح", "error");
      return false;
    }

    // التحقق من طول كلمة المرور
    if (password.length < 8) {
      showNotification("يجب أن تكون كلمة المرور 8 أحرف على الأقل", "error");
      return false;
    }

    // التحقق من تطابق كلمات المرور
    if (password !== confirmPassword) {
      showNotification("كلمات المرور غير متطابقة", "error");
      return false;
    }

    // التحقق من قوة كلمة المرور
    let passwordScore = 0;
    if (password.length >= 8) passwordScore += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) passwordScore += 1;
    if (/\d/.test(password)) passwordScore += 1;
    if (/[^a-zA-Z0-9]/.test(password)) passwordScore += 1;

    if (passwordScore < 3) {
      showNotification(
        "يرجى اختيار كلمة مرور أقوى تحتوي على أحرف كبيرة وصغيرة وأرقام ورموز",
        "error"
      );
      return false;
    }

    // التحقق من الموافقة على الشروط
    if (!termsChecked) {
      showNotification("يجب الموافقة على الشروط والأحكام للمتابعة", "error");
      return false;
    }

    return true;
  }

  // وظيفة إرسال بيانات التسجيل إلى الخادم
  async function registerUser(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "حدث خطأ أثناء التسجيل");
      }

      return data;
    } catch (error) {
      console.error("خطأ في التسجيل:", error);
      throw error;
    }
  }

  // تقديم نموذج التسجيل
  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const termsChecked = document.getElementById("terms").checked;
    const newsletterChecked =
      document.getElementById("newsletter")?.checked || false;

    // بيانات المستخدم للإرسال
    const userData = {
      firstName,
      lastName,
      email,
      username,
      password,
      confirmPassword,
      newsletter: newsletterChecked,
      termsChecked,
    };

    // التحقق من صحة البيانات
    if (!validateForm(userData)) {
      return;
    }

    // إظهار حالة التحميل
    setButtonLoading(btnSignup, true);

    try {
      // حذف حقول غير مطلوبة للخادم
      delete userData.confirmPassword;
      delete userData.termsChecked;

      // إرسال البيانات إلى الخادم
      const result = await registerUser(userData);

      showNotification(result.message || "تم إنشاء حسابك بنجاح!", "success");

      // إعادة توجيه المستخدم بعد فترة
      setTimeout(() => {
        window.location.href =
          "/login.html?registered=true" +
          (result.requiresVerification ? "&verify=true" : "");
      }, 1500);
    } catch (error) {
      showNotification(
        error.message || "حدث خطأ أثناء التسجيل، يرجى المحاولة مرة أخرى",
        "error"
      );
    } finally {
      // إعادة تعيين حالة الزر
      setButtonLoading(btnSignup, false);
    }
  });

  // التسجيل باستخدام Google
  btnGoogle.addEventListener("click", function () {
    setButtonLoading(btnGoogle, true);

    // يمكن إضافة التكامل مع Google OAuth هنا
    setTimeout(() => {
      showNotification(
        "خاصية التسجيل باستخدام Google غير متاحة حالياً",
        "info"
      );
      setButtonLoading(btnGoogle, false);
    }, 1000);
  });

  // التسجيل باستخدام Discord
  btnDiscord.addEventListener("click", function () {
    setButtonLoading(btnDiscord, true);

    // يمكن إضافة التكامل مع Discord OAuth هنا
    setTimeout(() => {
      showNotification(
        "خاصية التسجيل باستخدام Discord غير متاحة حالياً",
        "info"
      );
      setButtonLoading(btnDiscord, false);
    }, 1000);
  });

  // رابط تسجيل الدخول
  loginLink.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "login.html";
  });

  // إضافة التركيز على الاسم الأول عند تحميل الصفحة
  document.getElementById("firstName").focus();

  // إضافة تفاعلات لوحة المفاتيح لتحسين تجربة المستخدم
  document.addEventListener("keydown", function (e) {
    // تبديل رؤية كلمة المرور عند الضغط على Alt+P
    if (e.altKey && e.key === "p") {
      e.preventDefault();
      togglePasswordVisibility(passwordField, passwordIcon);
    }

    if (e.key === "Enter") {
      e.preventDefault();
      btnSignup.click();
    }
  });
});