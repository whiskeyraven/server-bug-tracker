const mongoose = require('mongoose');

const bugSchema = mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'The summary field cannot be empty'],
      minlength: [5, 'The bug summary must have at least five characters.'],
    },
    description: {
      type: String,
      required: true,
    },
    isReproducable: {
      type: String,
      enum: ['Always', 'Sometimes', 'Never'],
      required: true,
    },
    severity: {
      type: String,
      enum: ['Minor', 'Moderate', 'Major', 'Critical'],
      required: true,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Resolved'],
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    resolved: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

bugSchema.pre(/^find/, function (next) {
  this.populate('project', 'name');
  this.populate('reportedBy', 'username');
  this.populate('assignedTo', 'username');
  // this.select('-__v');
  next();
});

module.exports = mongoose.model('Bug', bugSchema);
