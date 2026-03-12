const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Performance = require('../models/Performance');
const { generateRecommendations } = require('../services/aiService');

router.post('/submit', auth, async (req, res) => {
  try {
    const { topic, score, timeSpent, questionsAttempted, correctAnswers } = req.body;
    const studentId = req.user.userId;

    const accuracy = (correctAnswers / questionsAttempted) * 100;

    const performance = new Performance({
      studentId,
      topic,
      score,
      timeSpent,
      accuracy,
      questionsAttempted,
      correctAnswers
    });

    await performance.save();

    if (score < 60) {
      await generateRecommendations(studentId, topic, score);
    }

    res.status(201).json({
      message: 'Quiz submitted successfully',
      performance
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
