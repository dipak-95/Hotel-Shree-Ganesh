const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// Admin Login
router.post('/login', authController.login);
router.post('/register', authController.register); // Optional for setup

module.exports = router;
