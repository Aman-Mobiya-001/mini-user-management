const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const { validateSignup, validateLogin } = require('../middleware/validation');

const router = express.Router();

// Change 'register' to 'signup' to match frontend
router.post('/signup', validateSignup, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);

module.exports = router;
