const mongoose = require('mongoose');

const bugSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'The title field cannot be empty'],
      minlength: [5, 'The bug title must have at least five characters.'],
    },
    severity: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fixer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: { createdAt: 'created_at' } }
);

bugSchema.pre(/^find/, function (next) {
  this.populate('creator', 'username');
  this.select('-__v');
  next();
});

module.exports = mongoose.model('Bug', bugSchema);
