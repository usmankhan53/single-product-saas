const User = require('../../models/User');
const bcrypt = require('bcryptjs');

const passwordChangeService = async ({ userId, newPassword }) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  await user.save();

  return { msg: 'Password changed successfully' };
};

module.exports = passwordChangeService;
