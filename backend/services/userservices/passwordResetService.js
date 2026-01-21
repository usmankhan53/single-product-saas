const User = require('../../models/User');
const crypto = require('crypto');
const sendEmail = require('./emailService');
require('dotenv').config();

const passwordResetService = async (email) => {
  // Find user
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Set token and expiration in user document (expires in 1 hour)
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour
  await user.save();

  // Send reset email
  const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`; // Frontend URL
  const message = `You requested a password reset. Click this link to reset your password:\n\n${resetURL}\n\nIf you did not request this, ignore this email.`;

  await sendEmail({
    to: user.email,
    subject: 'Password Reset Request',
    text: message,
  });

  return { msg: 'Password reset email sent successfully' };
};

module.exports = passwordResetService;
