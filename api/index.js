const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
const clientRoutes = require('../routes/clientRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/clients', clientRoutes);

const mongoDB = process.env.MONGODB_URI || 'mongodb://localhost/your-db';
mongoose.connect(mongoDB)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Export default handler for Vercel
module.exports = serverless(app);  // <--- Here is the fix
