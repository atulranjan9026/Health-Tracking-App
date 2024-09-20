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
const corsOptions = {
    origin: 'https://health-tracking-app-1-i17w.onrender.com/', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS method
  allowedHeaders: ['Content-Type', 'Authorization'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // If you need to support credentials (like cookies)
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
// Routes
app.use('/api', authRoutes);
app.use('/api', healthRecords);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
