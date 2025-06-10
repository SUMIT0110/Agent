const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  clientId: { type: String, unique: true, required: true },
  personalInfo: {
    name: String,
    phone: String,
    email: String,
    timezone: String
  },
  investmentData: {
    totalInvestment: Number,
    currentValue: Number,
    returns: Number,
    returnsPercentage: Number,
    portfolioBreakdown: [
      {
        asset: String,
        value: Number,
        percentage: Number
      }
    ],
    lastUpdated: Date
  },
  preferences: {
    preferredCallTime: String,
    callFrequency: String,
    topics: [String]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Client', ClientSchema);
