const signupService = require('../services/userservices/signupService');
const loginService = require('../services/userservices/loginService');
const passwordResetService = require('../services/userservices/passwordResetService');
const passwordChangeService = require('../services/userservices/passwordChangeService');
const emailService = require('../services/userservices/emailService');
const passwordResetConfirmService = require('../services/userservices/passwordResetConfirmService');

// Signup
exports.signup = async (req, res) => {
  try {
    const result = await signupService(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const result = await loginService(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Password Reset
exports.resetPassword = async (req, res) => {
  try {
    const resetToken = await passwordResetService(req.body.email);
    // // Optionally send email
    // await emailService({
    //   to: req.body.email,
    //   subject: 'Password Reset',
    //   text: `Your reset token: ${resetToken}`,
    // });
    res.status(200).json({ msg: 'Password reset email sent' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Confirm password reset (user submits new password with token)
exports.resetPasswordConfirm = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const result = await passwordResetConfirmService({ token, newPassword });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Password Change
exports.changePassword = async (req, res) => {
  try {
    const result = await passwordChangeService({
      userId: req.user.id, // comes from authMiddleware
      newPassword: req.body.newPassword,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
