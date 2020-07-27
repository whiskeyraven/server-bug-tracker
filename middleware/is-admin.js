const AppError = require('../util/appError');

module.exports = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(new AppError('Unauthorized action', 403));
  }
  next();
};
