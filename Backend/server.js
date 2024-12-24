// server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const appointmentRoutes = require('./routes/appointmentRoutes');

// Load environment variables
dotenv.config();



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/hospitals', require('./routes/hospitalRoutes'));
// app.use('/api/records', require('./routes/recordRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/hospitals', require('./routes/hospitalRoutes'));
app.use('/api/records', require('./routes/recordRoutes'));


// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Server Error' });
});

// Start the server
async function main() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in the .env file');
    }

    console.log('Attempting to connect to MongoDB ');
    await mongoose.connect(uri);
    console.log('Connected to MongoDB successfully');
    console.log('API is running on port 5000');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start the server:', error.message);
    process.exit(1);
  }
}

main();
