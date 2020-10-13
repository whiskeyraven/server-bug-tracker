const AppError = require('../util/appError');

module.exports = (req, res, next) => {
  const { user } = req;
  let currentUser;
  if (req.doc.owner) {
    currentUser = req.doc.owner._id.toString();
  } else if (req.doc.reportedBy) {
    currentUser = req.doc.reportedBy._id.toString();
  }

  if (user.id !== currentUser && user.role !== 'admin') {
    return next(new AppError('Unauthorized action.', 403));
  }

  next();
};
