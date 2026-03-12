const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Performance = require('../models/Performance');

router.get('/', auth, async (req, res) => {
  try {
    const { topic, startDate, endDate } = req.query;
    const studentId = req.user.userId;

    let query = { studentId };
    
    if (topic) query.topic = topic;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const performances = await Performance.find(query).sort({ date: -1 });

    const topicStats = await Performance.aggregate([
      { $match: { studentId: req.user.userId } },
      { $group: {
        _id: '$topic',
        avgScore: { $avg: '$score' },
        avgAccuracy: { $avg: '$accuracy' },
        totalTime: { $sum: '$timeSpent' },
        attempts: { $sum: 1 }
      }},
      { $sort: { avgScore: -1 } }
    ]);

    res.json({ performances, topicStats });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
