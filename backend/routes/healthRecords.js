const express = require('express');
const router = express.Router();
const HealthRecord = require('../models/HealthRecord');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new health record
router.post('/health-records', authMiddleware, async (req, res) => {
  try {
    const { date, temperature, bloodPressure, heartRate } = req.body;
    const userId = req.user.id; // Extract user ID from token
    const newRecord = new HealthRecord({ date, temperature, bloodPressure, heartRate, user: userId });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    console.error("Error:", err); // Log error
    res.status(500).json({ message: 'Server Error' });
  }
});

// Retrieve all health records for the authenticated user
router.get('/health-records', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from token
    const records = await HealthRecord.find({ user: userId });
    res.json(records);
  } catch (err) {
    console.error("Error:", err); // Log error
    res.status(500).json({ message: 'Server Error' });
  }
});

// Retrieve a specific health record by ID
router.get('/health-records/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from token
    const record = await HealthRecord.findOne({ _id: req.params.id, user: userId }); // Ensure the record belongs to the user
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json(record);
  } catch (err) {
    console.error("Error:", err); // Log error
    res.status(500).json({ message: 'Server Error' });
  }
});


// Update a health record
router.put('/health-records/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from token
    const { date, temperature, bloodPressure, heartRate } = req.body;

    // Find the record and update it
    const record = await HealthRecord.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      { date, temperature, bloodPressure, heartRate },
      { new: true }
    );

    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json(record);
  } catch (err) {
    console.error("Error:", err); // Log error
    res.status(500).json({ message: 'Server Error' });
  }
});


// Delete a health record
router.delete('/health-records/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from token
    const record = await HealthRecord.findOneAndDelete({ _id: req.params.id, user: userId });
    if (!record) return res.status(404).json({ message: 'Record not found or access denied' });
    res.json({ message: 'Record deleted' });
  } catch (err) {
    console.error("Error:", err); // Log error
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
