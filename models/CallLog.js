const mongoose = require('mongoose');

const CallLogSchema = new mongoose.Schema({
  clientId: { type: String, required: true },
  callSid: { type: String }, // Twilio Call SID
  startTime: { type: Date },
  endTime: { type: Date },
  duration: { type: Number }, // in seconds
  status: { type: String }, // 'completed', 'failed', etc.
  conversation: [
    {
      speaker: { type: String, enum: ['ai', 'client'] },
      message: { type: String },
      timestamp: { type: Date }
    }
  ],
  outcome: {
    informationDelivered: { type: Boolean, default: false },
    reschedulingRequested: { type: Boolean, default: false },
    newScheduleTime: { type: Date },
    clientSatisfaction: { type: String } // optional rating
  }
});

module.exports = mongoose.model('CallLog', CallLogSchema);
