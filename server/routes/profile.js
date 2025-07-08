const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const { upload } = require('../controllers/uploadController');

const router = express.Router();

router.post(
  '/upload',
  passport.authenticate('jwt', { session: false }),
  upload.single('avatar'),
  async (req, res) => {
    const user = await User.findById(req.user._id);
    user.avatar = req.file.filename;
    await user.save();
    res.json({ message: 'Profile picture updated', avatar: req.file.filename });
  }
);

module.exports = router;
