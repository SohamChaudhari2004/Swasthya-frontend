// models/Hospital.js
const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String }, // Optional, add more fields as required
});

const Hospital = mongoose.model('Hospital', hospitalSchema); // Ensure the model is registered
module.exports = Hospital; // Export the model
