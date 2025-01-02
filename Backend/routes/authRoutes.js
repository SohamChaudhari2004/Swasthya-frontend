const express = require('express');
const { registerUser, loginUser } = require('../controller/authController');
const router = express.Router();

// Register User
router.post('/register', registerUser); // Adds a user to the database with hashed password

// Login User
router.post('/login', loginUser); // Authenticates user and provides JWT token

module.exports = router;
