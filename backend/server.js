require('dotenv').config(); // Ensure environment variables are loaded
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const healthRecords = require('./routes/healthRecords');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(express.json()); 
app.use(cors({
    origin: 'https://health-tracking-app-1-i17w.onrender.com/', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS method
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.use('/api', authRoutes);
app.use('/api', healthRecords);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
