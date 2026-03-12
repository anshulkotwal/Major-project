const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['video', 'article', 'topic', 'studyplan', 'flashcard'],
    required: true
  },
  content: {
    title: String,
    description: String,
    url: String,
    thumbnail: String,
    difficulty: String,
    estimatedTime: String
  },
  topic: String,
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'viewed', 'completed', 'dismissed'],
    default: 'pending'
  },
  generatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Recommendation', recommendationSchema);
