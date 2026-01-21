const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signupService = async ({ name, email, password }) => {
  // Check if user exists
  let user = await User.findOne({ email });
  if (user) throw new Error('User already exists');

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  user = new User({ name, email, password: hashedPassword });
  await user.save();

  // Generate JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
};

module.exports = signupService;
