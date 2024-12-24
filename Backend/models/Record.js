const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true }, // e.g., 'prescription', 'lab result', etc.
  details: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Record', RecordSchema);
