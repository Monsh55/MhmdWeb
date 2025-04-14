const validatePassword = (password) => {
  if (password.length < 8) {
    return {
      isValid: false,
      message: "يجب أن تكون كلمة المرور 8 أحرف على الأقل",
    };
  }

  let passwordStrength = 0;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) passwordStrength += 1;
  if (/\d/.test(password)) passwordStrength += 1;
  if (/[^a-zA-Z0-9]/.test(password)) passwordStrength += 1;

  if (passwordStrength < 2) {
    return {
      isValid: false,
      message:
        "كلمة المرور ضعيفة، يجب أن تحتوي على أحرف كبيرة وصغيرة، أرقام، ورموز",
    };
  }

  return {
    isValid: true,
    message: "كلمة المرور صالحة",
  };
};

module.exports = {
  validatePassword,
};
