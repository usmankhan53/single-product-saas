const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const authMiddleware = require('../../middleware/authMiddleware');

// Public routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/reset-password', authController.resetPassword);
router.post('/reset-password-confirm', authController.resetPasswordConfirm); // user submits new password + token

// Protected routes
router.post('/change-password', authMiddleware, authController.changePassword);

module.exports = router;
