const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');
const authController = require('../controllers/auth');
const User = require('../models/user');

// Create new user
router.post('/signup', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
      return User.findOne({ email: value })
        .then(userDoc => {
          if (userDoc) {
            return Promise.reject('Please use a different email address');
          }
        });
    }),
  body('password').trim().isLength({ min: 5 }),
  body('name').trim().isLength({ min: 2 }).not().isEmpty()
],
authController.signup);

router.post('/login', authController.login);

// Get single user by id
router.get('/:id', authController.getUserById);

// Get all users
router.get('', authController.getAllUsers);

// Delete single user
router.delete('/:id', authController.deleteUser);

module.exports = router;