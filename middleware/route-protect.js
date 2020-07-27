const { promisify } = require('util');

const jwt = require('jsonwebtoken');
const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');
const User = require('../models/user');

module.exports = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError(
        'You are not currently logged in.  Please log in to access.',
        401
      )
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_KEY);
  const userCheck = await User.findById(decoded.userId);
  if (!userCheck) {
    return next(new AppError('Unable to verify user.', 401));
  }

  req.user = {
    id: decoded.userId,
    role: decoded.role,
  };
  next();
});
