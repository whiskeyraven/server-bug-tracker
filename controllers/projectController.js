const Project = require('../models/project');
const factory = require('./handlerFactory');

exports.getAllProjects = factory.getAll(Project);

exports.getProject = factory.getOne(Project, {
  path: 'issues',
  select: 'summary severity priority',
});

exports.createProject = factory.createOne(Project);

exports.updateProject = factory.updateOne(Project);

exports.deleteProject = factory.deleteOne(Project);
