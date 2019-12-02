const mongoose = require('mongoose');

const bugSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  fixer: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
  // creator: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // }
},
  { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Bug', bugSchema);
