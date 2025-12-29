const express = require('express');
const { register, login } = require('../controllers/authController');
const { validateSignup, validateLogin } = require('../middleware/validation');
const router = express.Router();

router.post('/register', validateSignup, register);
router.post('/login', validateLogin, login);

module.exports = router;
