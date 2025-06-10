const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

async function generateVoiceScript(client) {
  const prompt = `
You are an AI assistant talking to a client about their investment portfolio.
This is the summary:
- Name: ${client.personalInfo.name}
- Total Investment: ₹${client.investmentData.totalInvestment}
- Current Value: ₹${client.investmentData.currentValue}
- Returns: ₹${client.investmentData.returns} (${client.investmentData.returnsPercentage}%)
- Preferred Topics: ${client.preferences.topics.join(", ")}

Create a short friendly conversation script for a voice call.
Keep it under 30 seconds.
Say hello, give summary, and ask if they want to reschedule.
Use simple, clear tone.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

module.exports = { generateVoiceScript };
