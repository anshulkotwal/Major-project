const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ChatHistory = require('../models/ChatHistory');
const { getChatResponse } = require('../services/aiService');

router.post('/', auth, async (req, res) => {
  try {
    const { message, sessionId, topic } = req.body;
    const studentId = req.user.userId;

    let chatHistory = await ChatHistory.findOne({ studentId, sessionId });
    
    if (!chatHistory) {
      chatHistory = new ChatHistory({
        studentId,
        sessionId: sessionId || Date.now().toString(),
        topic,
        messages: []
      });
    }

    chatHistory.messages.push({
      role: 'user',
      content: message
    });

    const aiResponse = await getChatResponse(message, chatHistory.messages);

    chatHistory.messages.push({
      role: 'assistant',
      content: aiResponse
    });

    await chatHistory.save();

    res.json({
      response: aiResponse,
      sessionId: chatHistory.sessionId
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/history', auth, async (req, res) => {
  try {
    const { sessionId } = req.query;
    const studentId = req.user.userId;

    const query = { studentId };
    if (sessionId) query.sessionId = sessionId;

    const history = await ChatHistory.find(query).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
