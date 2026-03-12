const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Performance = require('../models/Performance');
const Recommendation = require('../models/Recommendation');
const StudyPlan = require('../models/StudyPlan');

router.get('/', auth, async (req, res) => {
  try {
    const studentId = req.user.userId;

    const recentPerformance = await Performance.find({ studentId })
      .sort({ date: -1 })
      .limit(10);

    const recommendations = await Recommendation.find({ 
      studentId,
      status: { $ne: 'dismissed' }
    })
      .sort({ priority: -1, createdAt: -1 })
      .limit(5);

    const studyPlan = await StudyPlan.findOne({ studentId })
      .sort({ createdAt: -1 });

    const weakTopics = await Performance.aggregate([
      { $match: { studentId: req.user.userId } },
      { $group: {
        _id: '$topic',
        avgScore: { $avg: '$score' },
        attempts: { $sum: 1 }
      }},
      { $match: { avgScore: { $lt: 60 } } },
      { $sort: { avgScore: 1 } },
      { $limit: 5 }
    ]);

    const overallStats = await Performance.aggregate([
      { $match: { studentId: req.user.userId } },
      { $group: {
        _id: null,
        avgScore: { $avg: '$score' },
        totalTime: { $sum: '$timeSpent' },
        totalQuestions: { $sum: '$questionsAttempted' },
        totalCorrect: { $sum: '$correctAnswers' }
      }}
    ]);

    res.json({
      recentPerformance,
      recommendations,
      studyPlan,
      weakTopics,
      stats: overallStats[0] || {}
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
