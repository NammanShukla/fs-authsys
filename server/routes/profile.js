const express = require('express');
const passport = require('passport');
const { upload } = require('../controllers/uploadController');
const { uploadAvatar } = require('../controllers/profileController');

const router = express.Router();

router.post(
  '/upload',
  passport.authenticate('jwt', { session: false }),
  upload.single('avatar'),
  uploadAvatar
);

module.exports = router;
