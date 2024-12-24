const Record = require('../models/Record');

// Get all records for a user
exports.getUserRecords = async (req, res) => {
  try {
    const records = await Record.find({ user: req.user.id });
    res.status(200).json({ success: true, data: records });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new record for a user
exports.addRecord = async (req, res) => {
  try {
    const { type, details } = req.body;

    const record = await Record.create({
      user: req.user.id,
      type,
      details,
    });

    res.status(201).json({ success: true, data: record });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a record
exports.deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await Record.findById(id);

    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    if (record.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await record.remove();

    res.status(200).json({ success: true, message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
