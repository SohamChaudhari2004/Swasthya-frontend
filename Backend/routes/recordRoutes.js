const express = require('express');
const { getUserRecords, addRecord, deleteRecord } = require('../controllers/recordController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Routes
router.get('/', authMiddleware, getUserRecords); // Get user records
router.post('/', authMiddleware, addRecord);    // Add a new record
router.delete('/:id', authMiddleware, deleteRecord); // Delete a record

module.exports = router;
