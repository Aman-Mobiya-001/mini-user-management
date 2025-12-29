const express = require('express');
const { protect } = require('../middleware/auth');
const adminCheck = require('../middleware/admin');
const { 
  getMe, 
  updateProfile, 
  changePassword, 
  getAllUsers, 
  updateUserStatus 
} = require('../controllers/userController');
const { validateProfileUpdate, validatePasswordChange } = require('../middleware/validation');

const router = express.Router();

router.use(protect); // All routes require auth

// User routes
router.get('/me', getMe);
router.put('/me', validateProfileUpdate, updateProfile);
router.put('/me/password', validatePasswordChange, changePassword);

// Admin routes
router.get('/', adminCheck, getAllUsers);
router.patch('/:id/status', adminCheck, updateUserStatus);

module.exports = router;
