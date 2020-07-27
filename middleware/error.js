module.exports = (error, req, res, next) => {
  console.log('HERE IS THE ERROR', error)
  res.status(500).json({
    message: 'HANDLING ERROR',
    error: error
  });
}