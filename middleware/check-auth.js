const AppError = require('../util/appError');

module.exports = (req, res, next) => {
  const { user } = req;
  const reportedBy = req.doc.reportedBy._id.toString();

  if (user.id !== reportedBy && user.role !== 'admin') {
    return next(new AppError('Unauthorized action.', 403));
  }

  next();
};
