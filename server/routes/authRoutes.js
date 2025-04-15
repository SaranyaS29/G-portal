// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, signin } = require('../controllers/authController');

// POST routes for registration and sign-in
router.post('/register', register);
router.post('/signin', signin);

module.exports = router;  // Ensure this export is correct
