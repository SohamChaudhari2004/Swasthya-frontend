const mongoose = require('mongoose');
const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
  try {
    const { userId, hospitalId, doctorId, doctorName, doctorSpecialization, date, timeSlot } = req.body;

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(hospitalId)) {
      return res.status(400).json({ message: 'Invalid hospital ID' });
    }
    console.log('Received hospitalId:', hospitalId); // Log the value of hospitalId

    if (!mongoose.Types.ObjectId.isValid(hospitalId)) {
      return res.status(400).json({ message: 'Invalid hospital ID', hospitalId });
    }
    

    // Convert hospitalId and doctorId to ObjectId
    const hospitalObjectId =new mongoose.Types.ObjectId(hospitalId);
    const doctorObjectId =new mongoose.Types.ObjectId(doctorId);

    // Create a new appointment
    const newAppointment = new Appointment({
      userId,
      hospitalId: hospitalObjectId, // Use the converted ObjectId
      doctorId: doctorObjectId,     // Use the converted ObjectId
      doctorName,
      doctorSpecialization,
      date,
      timeSlot,
    });

    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    // Log the error in more detail
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: 'Error creating appointment', error: error.message });
  }
};


// Get all appointments for a specific user
exports.getAppointmentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('Fetching appointments for userId:', userId); // Log the userId

    // Find appointments for the user and populate hospital data only
    const appointments = await Appointment.find({ userId })
      .populate('hospitalId', 'name address'); // Populate hospital name and address only

    // Check if appointments are found
    if (!appointments || appointments.length === 0) {
      console.log('No appointments found for user:', userId); // Log when no appointments are found
      return res.status(404).json({ message: 'No appointments found for the given user' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error); // Log the error details
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
};



// Update appointment status (e.g., Pending, Confirmed, Cancelled)
// Update appointment status (e.g., Pending, Confirmed, Cancelled)
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;

    // Ensure valid status value
    const validStatuses = ['Pending', 'Confirmed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Update the status of the appointment
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment', error });
  }
};


// Delete an appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    // Find the appointment by ID and delete it
    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment', error });
  }
};
