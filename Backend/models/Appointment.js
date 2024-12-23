const mongoose = require('mongoose');
const Hospital = require('./Hospital'); // Import the Hospital model

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital', // Reference to the Hospital model
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  doctorSpecialization: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String, // e.g., "10:00 AM - 10:30 AM"
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending',
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema); // Register the Appointment model
module.exports = Appointment;
