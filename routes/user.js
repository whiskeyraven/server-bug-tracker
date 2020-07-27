const express = require('express');
const UserController = require('../controllers/userController');
const AuthController = require('../controllers/authController');
const routeProtect = require('../middleware/route-protect');
const isAdmin = require('../middleware/is-admin');
// const isUser = require('../middleware/is-user');

const router = express.Router();

router.get('/users', routeProtect, isAdmin, UserController.getAllUsers);

// Create a new user
router.post('/signup', AuthController.signup);

// User login
router.post('/login', AuthController.userLogin);

// User update self
router.patch('/updateProfile', routeProtect, UserController.updateProfile);

// Delete user
router.delete('/deleteUser/:id', routeProtect, UserController.deleteUser);

// Forgot password
router.post('/forgotPassword', AuthController.forgotPassword);

// Reset password
router.patch('/resetPassword/:token', AuthController.resetPassword);

// Update password
router.patch('/updateMyPassword', routeProtect, AuthController.updatePassword);

module.exports = router;
