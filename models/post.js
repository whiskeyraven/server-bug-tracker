const mongoose = require('mongoose');
const Comment = require('./comment');

const postSchema = mongoose.Schema(
  {
    post: {
      type: String,
      trim: true,
      required: [true, 'The post field cannot be empty'],
      minlength: [1, 'A post must have at least one character.'],
    },
    imagePath: {
      type: String,
      trim: true,
    },
    reactions: {
      type: Array,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    id: false,
  }
);

postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});

postSchema.pre(/^find/, function (next) {
  this.populate('creator', 'username');
  this.populate('comments');
  this.select('-__v');
  next();
});

postSchema.pre('deleteOne', { document: true, query: false }, async function (
  next
) {
  const postId = this._id;
  await Comment.deleteMany({ post: postId });
  next();
});

module.exports = mongoose.model('Post', postSchema);
