const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  timeSpent: {
    type: Number,
    default: 0
  },
  accuracy: {
    type: Number,
    min: 0,
    max: 100
  },
  questionsAttempted: {
    type: Number,
    default: 0
  },
  correctAnswers: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Performance', performanceSchema);
