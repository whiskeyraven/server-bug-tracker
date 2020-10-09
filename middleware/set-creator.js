module.exports = (req, res, next) => {
  if (!req.body.reportedBy) {
    req.body.reportedBy = req.user.id;
  }
  next();
};
