const User = require('../models/user');
const catchAsync = require('../util/catchAsync');

const factory = require('./handlerFactory');
const AppError = require('../util/appError');

const filteredObj = (obj) => {
  const selectedFields = ['email', 'username'];
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (selectedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getUser = factory.getOne(User);

exports.updateProfile = catchAsync(async (req, res, next) => {
  if (req.body.password) {
    delete req.body.password;
  }

  const filteredUser = filteredObj(req.body);
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredUser, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    updatedUser,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const pid = req.params.id.trim();
  const uid = req.user.id;

  if (pid !== uid && req.user.role !== 'admin') {
    return next(new AppError('Unauthorized action', 403));
  }

  const selectedUser = await User.findById(pid);
  selectedUser.deleteOne();

  res.status(200).json({
    status: 'success',
    message: 'User deleted',
  });
});

exports.getAllUsers = factory.getAll(User, 'username');
