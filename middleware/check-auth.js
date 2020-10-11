const AppError = require('../util/appError');

module.exports = (req, res, next) => {
  const { user } = req;
  let currentUser;
  if (Object.prototype.hasOwnProperty.call(req.doc, 'owner')) {
    currentUser = req.doc.reportedBy._id.toString();
  } else if (Object.prototype.hasOwnProperty.call(req.doc, 'reportedBy')) {
    currentUser = req.doc.reportedBy._id.toString();
  }

  if (user.id !== currentUser && user.role !== 'admin') {
    return next(new AppError('Unauthorized action.', 403));
  }

  next();
};
