/* eslint-disable prettier/prettier */
const AppError = require('../util/appError');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    error: err,
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // eslint-disable-next-line no-console
    // console.error('ERROR: ', err);

    res.status(500).json({
      status: 'error',
      message: 'Something has gone wrong.',
    });
  }
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data.  ${errors.join('. ')}`;

  return new AppError(message, 400);
};

const handleJWTerror = () =>
  new AppError('Invalid token.  Please log in again.', 401);

const handleJWTexpiredError = () =>
  new AppError('Token has expired.  Please log in again.', 401);

module.exports = (err, req, res, next) => {
  const currentEnv = process.env.NODE_ENV.trim();
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (currentEnv === 'development') {
    sendErrorDev(err, res);
  } else if (currentEnv === 'production') {
    let error = Object.create(err);
    if (error._message && error._message.includes('validation')) {
      error = handleValidationError(error);
    }
    if (error.name && error.name === 'JsonWebTokenError') {
      error = handleJWTerror(error);
    }
    if (error.name && error.name === 'TokenExpiredError') {
      error = handleJWTexpiredError(error);
    }
    sendErrorProd(error, res);
  }
};
