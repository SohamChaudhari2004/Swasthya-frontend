const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Correct import of bcryptjs

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  healthData: { type: Object, default: {} },
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);  // bcrypt is now defined
  next();
});

module.exports = mongoose.model('User', UserSchema);
