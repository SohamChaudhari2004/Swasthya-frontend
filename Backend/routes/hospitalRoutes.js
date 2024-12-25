const express = require('express');
const { getNearbyHospitals, addHospital } = require('../controller/hospitalcontroller');

const router = express.Router();

// Routes
router.get('/nearby', getNearbyHospitals); // Get nearby hospitals
router.post('/add', addHospital);         // Add a new hospital

module.exports = router;
