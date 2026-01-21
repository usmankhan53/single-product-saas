const User = require('../../models/User');
const bcrypt = require('bcryptjs');

const passwordResetConfirmService = async ({ token, newPassword }) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() }, // token still valid
  });

  if (!user) throw new Error('Invalid or expired reset token');

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);

  // Clear token & expiration
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return { msg: 'Password has been reset successfully' };
};

module.exports = passwordResetConfirmService;
