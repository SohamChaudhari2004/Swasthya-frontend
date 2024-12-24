const Hospital = require('../models/Hospital');

// Get nearby hospitals based on user's location
exports.getNearbyHospitals = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and Longitude are required' });
  }

  try {
    const hospitals = await Hospital.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [longitude, latitude] },
          $maxDistance: 5000, // 5 km radius
        },
      },
    });

    res.status(200).json({ success: true, data: hospitals });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new hospital
exports.addHospital = async (req, res) => {
  try {
    const { name, address, contact, location } = req.body;
    const hospital = await Hospital.create({ name, address, contact, location });

    res.status(201).json({ success: true, data: hospital });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
