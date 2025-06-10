// api/index.js
const serverless = require('serverless-http');
const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
require('dotenv').config();

// import your models & routes
const clientRoutes   = require('../routes/clientRoutes');
const callRoutes     = require('../routes/callRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// mount routes under /api
app.use('/api/clients', clientRoutes);
app.use('/api/calls',    callRoutes);

// simple health-check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// connect to MongoDB (reuse existing connection if there is one)
let conn = null;
async function connectDB() {
  if (conn) return conn;
  conn = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
  });
  return conn;
}

// wrap handler so DB is ready
module.exports.handler = serverless(async (req, res) => {
  await connectDB();
  return app(req, res);
});
