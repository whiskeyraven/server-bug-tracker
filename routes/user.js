const express = require('express');
const UserController = require('../controllers/userController');
const AuthController = require('../controllers/authController');
const routeProtect = require('../middleware/route-protect');
const isAdmin = require('../middleware/is-admin');

const router = express.Router();

router.get('/users', routeProtect, isAdmin, UserController.getAllUsers);
router.get('/:id', routeProtect, UserController.getUser);

// Create a new user
router.post('/signup', AuthController.signup);

// User login
router.post('/login', AuthController.userLogin);

// User update self
router.patch('/updateProfile', routeProtect, UserController.updateProfile);

// Delete user
router.delete('/:id', routeProtect, isAdmin, UserController.deleteUser);

// Forgot password
router.post('/forgotPassword', AuthController.forgotPassword);

// Reset password
router.patch('/resetPassword/:token', AuthController.resetPassword);

// Update password
router.patch('/updateMyPassword', routeProtect, AuthController.updatePassword);

module.exports = router;
