const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ error: 'Something went wrong during registration' });
  }
});


router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ user: req.user });
});

router.get('/user', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not logged in' });
  res.json({ user: req.user });
});

router.post('/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destruction error:', err);
        return res.status(500).json({ error: 'Failed to log out' });
      }
      res.clearCookie('connect.sid');
      res.json({ message: 'Logged out and session destroyed' });
    });
  });
});


module.exports = router;
