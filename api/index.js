// api/index.js

const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
const clientRoutes = require('../routes/clientRoutes');  // Adjust path accordingly

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/clients', clientRoutes);

// MongoDB connection (use environment variable for production)
const mongoDB = process.env.MONGODB_URI || 'mongodb://localhost/your-db';
mongoose.connect(mongoDB)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Serverless handler
module.exports.handler = serverless(app);
