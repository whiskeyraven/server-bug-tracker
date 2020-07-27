const catchAsync = require('../util/catchAsync');
const APIFeatures = require('../util/apiFeatures');
const AppError = require('../util/appError');

const getModelName = (Model) => {
  return Model.modelName;
};

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.create(req.body);

    res.status(200).json({
      status: 'success',
      message: `${getModelName(Model)} created successfully.`,
      data: document,
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) {
      query = query.populate(populateOptions);
    }
    const document = await query;

    if (!document) {
      return next(new AppError('No document found with that ID.', 404));
    }

    res.status(200).json({
      status: 'success',
      message: `${getModelName(Model)} retrieved successfully`,
      data: document,
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find(), req.query)
      .sort()
      .limitFields();

    const documents = await features.query.sort({
      created_at: -1,
    });

    res.status(200).json({
      message: `${getModelName(Model)} list retrieved successfully`,
      results: documents.length,
      documents,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!document) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      message: `${getModelName(Model)} updated successfully`,
      data: document,
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const { doc } = req;

    if (!doc) {
      return next(new AppError('No document found with that ID.', 404));
    }

    doc.deleteOne();

    res.status(200).json({
      status: 'success',
      message: `${getModelName(Model)} deleted.`,
    });
  });
