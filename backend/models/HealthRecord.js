const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  temperature: { type: Number, required: true },
  bloodPressure: { type: String, required: true },
  heartRate: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the User model
});

module.exports = mongoose.model('HealthRecord', healthRecordSchema);