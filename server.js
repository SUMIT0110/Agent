require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const clientRoutes = require('./routes/clientRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/clients', clientRoutes);

// Connect DB and Start Server
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));
const { startCallScheduler } = require('./scheduler/callScheduler');
startCallScheduler();
const callRoutes = require('./routes/callRoutes');
app.use('/api/calls', callRoutes);
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
