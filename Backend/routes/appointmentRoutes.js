const express = require('express');
const router = express.Router();
const appointmentController = require('../controller/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to create a new appointment
router.post('/', authMiddleware,  appointmentController.createAppointment);

// Route to get all appointments for a specific user
router.get('/user/:userId', authMiddleware, appointmentController.getAppointmentsByUser);

// Route to update the status of an appointment
router.put('/:appointmentId/status', authMiddleware, appointmentController.updateAppointmentStatus);

// Route to delete an appointment
router.delete('/:appointmentId', authMiddleware, appointmentController.deleteAppointment);

module.exports = router;
