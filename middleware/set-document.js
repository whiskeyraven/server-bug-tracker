const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');

exports.setDocument = (model) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findById(id);

    if (!document) {
      return next(new AppError('No document found with that ID', 404));
    }

    req.doc = document;
    next();
  });
