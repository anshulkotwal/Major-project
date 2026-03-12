const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Recommendation = require('../models/Recommendation');
const Performance = require('../models/Performance');
const { generateRecommendations } = require('../services/aiService');

router.post('/generate', auth, async (req, res) => {
  try {
    const performances = await Performance.find({ studentId: req.user.userId })
      .sort({ date: -1 })
      .limit(20);

    const recommendations = await generateRecommendations(performances);

    const newRec = new Recommendation({
      studentId: req.user.userId,
      content: recommendations
    });

    await newRec.save();

    res.json({ recommendations });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const recommendations = await Recommendation.find({ studentId: req.user.userId })
      .sort({ generatedAt: -1 })
      .limit(5);

    res.json({ recommendations });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
