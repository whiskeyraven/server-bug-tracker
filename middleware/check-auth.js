const AppError = require('../util/appError');

module.exports = (req, res, next) => {
  const { user } = req;
  const creator = req.doc.creator._id.toString();

  if (user.id !== creator && user.role !== 'admin') {
    return next(new AppError('Unauthorized action.', 403));
  }

  next();
};
