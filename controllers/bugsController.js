const Bug = require('../models/bug');
const factory = require('./handlerFactory');

exports.getAllBugs = factory.getAll(Bug);

exports.getBug = factory.getOne(Bug, {
  path: 'reportedBy',
  select: 'username',
});

exports.createBug = factory.createOne(Bug);

exports.updateBug = factory.updateOne(Bug);

exports.deleteBug = factory.deleteOne(Bug);
