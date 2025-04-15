const express = require('express');
const router = express.Router();
const { submitComplaint,getUserComplaints } = require('../controllers/complaintController');

// Route for submitting a complaint
router.post('/', submitComplaint);
router.get('/:id', getUserComplaints);

module.exports = router;
