const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  weeks: {
    type: String,
    required: [true, 'Please add no of weeks']
  },
  tuition: {
    type: Number,
    required: [true, 'Please add tuition cost']
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please add minimum skills required'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  schlarshipAvailable: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    require: true
  }
});

module.exports = mongoose.model('Course', CourseSchema);
