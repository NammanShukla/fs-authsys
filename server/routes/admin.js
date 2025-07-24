const express = require('express');
const passport = require('passport');
const isAdmin = require('../middleware/isAdmin');
const { getAllUsers, updateUserRole } = require('../controllers/adminController');

const router = express.Router();

router.get(
  '/users',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  getAllUsers
);

router.patch(
  '/user/:id/role',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  updateUserRole
);

module.exports = router;
