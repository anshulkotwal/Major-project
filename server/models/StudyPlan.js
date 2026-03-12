const mongoose = require('mongoose');

const studyPlanSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  topics: [{
    name: String,
    status: {
      type: String,
      enum: ['not-started', 'in-progress', 'completed'],
      default: 'not-started'
    },
    estimatedTime: String,
    resources: [String],
    order: Number
  }],
  startDate: Date,
  endDate: Date,
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, { timestamps: true });

module.exports = mongoose.model('StudyPlan', studyPlanSchema);
