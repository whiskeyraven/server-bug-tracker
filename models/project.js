const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'The name field cannot be empty'],
      minlength: [2, 'The project name must have at least two characters.'],
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

projectSchema.virtual('issues', {
  ref: 'Bug',
  localField: '_id',
  foreignField: 'project',
});

projectSchema.pre(/^find/, function (next) {
  this.populate('owner', 'username');
  // this.select('-__v');
  next();
});

module.exports = mongoose.model('Project', projectSchema);
