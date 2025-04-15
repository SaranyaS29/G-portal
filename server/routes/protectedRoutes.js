const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ msg: `Welcome User ID: ${req.user}` });
});

module.exports = router;
