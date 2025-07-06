const express = require('express');
const passport = require('passport');
const {
  registerUser,
  loginUser,
  getAuthenticatedUser,
  refreshTokenHandler,
  logoutUser,
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshTokenHandler);
router.post('/logout', logoutUser);
router.get('/user', passport.authenticate('jwt', { session: false }), getAuthenticatedUser);

module.exports = router;
