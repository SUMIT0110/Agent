const mongoose = require('mongoose');

const CallScheduleSchema = new mongoose.Schema({
  clientId: { type: String, required: true },
  scheduledTime: { type: Date, required: true },
  callType: { type: String, enum: ['regular', 'rescheduled', 'urgent'], default: 'regular' },
  status: { type: String, enum: ['pending', 'completed', 'failed', 'cancelled'], default: 'pending' },
  attempts: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CallSchedule', CallScheduleSchema);
