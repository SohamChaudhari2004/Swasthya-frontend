const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'], // GeoJSON
      required: true,
    },
    coordinates: { type: [Number], required: true },
  },
});

HospitalSchema.index({ location: '2dsphere' }); // Geo-spatial indexing

module.exports = mongoose.model('Hospital', HospitalSchema);
