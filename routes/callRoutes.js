const express = require('express');
const router = express.Router();
const { initiateCall } = require('../services/twilioService');
const CallLog = require('../models/CallLog');
const { generateVoiceScript } = require('../services/geminiService');
const Client = require('../models/Client');

router.get('/logs', async (req, res) => {
  try {
    const logs = await CallLog.find().sort({ startTime: -1 }).limit(10);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/initiate', async (req, res) => {
  const { phone } = req.body;
  try {
    const call = await initiateCall(phone, 'https://agent-mocha.vercel.app/api/calls/webhook');
    res.status(200).json({ success: true, sid: call.sid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/webhook', async (req, res) => {
  // Use dummy client ID or extract from callSid in future
  const dummyClientId = "client-123";
  const client = await Client.findOne({ clientId: dummyClientId });

  const script = await generateVoiceScript(client);

  const twiml = `
    <Response>
      <Say voice="female">${script}</Say>
    </Response>
  `;
  res.type('text/xml');
  res.send(twiml);
});


module.exports = router;
