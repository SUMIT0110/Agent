const cron = require('node-cron');
const CallSchedule = require('../models/CallSchedule');
const Client = require('../models/Client');
const { initiateCall } = require('../services/twilioService');

function startCallScheduler() {
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    const calls = await CallSchedule.find({ scheduledTime: { $lte: now }, status: 'pending' });

    for (let call of calls) {
      const client = await Client.findOne({ clientId: call.clientId });
      if (!client) continue;

      try {
        const response = await initiateCall(client.personalInfo.phone, 'https://example.com/api/calls/webhook');
        call.status = 'completed';
        await call.save();
        console.log(`📞 Called ${client.personalInfo.name} at ${client.personalInfo.phone}`);
      } catch (err) {
        call.status = 'failed';
        call.attempts += 1;
        await call.save();
        console.error(`❌ Failed call to ${client.clientId}: ${err.message}`);
      }
    }
  });
}

module.exports = { startCallScheduler };
