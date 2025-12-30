const express = require('express');
const protect = require('../middleware/auth');
const adminCheck = require('../middleware/admin');
const {
  getMe,
  updateProfile,
  changePassword,
  getAllUsers,
  updateUserStatus
} = require('../controllers/userController');
const {
  validateProfileUpdate,
  validatePasswordChange
} = require('../middleware/validation');

const router = express.Router();

// All routes require auth
router.use(protect);

// User routes - Updated paths to match frontend
router.get('/me', getMe);
router.put('/profile', validateProfileUpdate, updateProfile);  // Changed from /me
router.put('/password', validatePasswordChange, changePassword);  // Changed from /me/password

// Admin routes
router.get('/', adminCheck, getAllUsers);
router.patch('/:id/status', adminCheck, updateUserStatus);

module.exports = router;
