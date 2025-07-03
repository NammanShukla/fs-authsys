const jwt = require('jsonwebtoken');
const User = require('../models/user');

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ error: 'Username might already exist' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.json({ token, user: { id: user._id, username: user.username } });
};


const getAuthenticatedUser = (req, res) => {
  res.json({ user: req.user });
};

module.exports = {
  registerUser,
  loginUser,
  getAuthenticatedUser,
};
