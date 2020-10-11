const express = require('express');

const router = express.Router();

const Project = require('../models/project');
const ProjectController = require('../controllers/projectController');

const routeProtect = require('../middleware/route-protect');
const { setDocument } = require('../middleware/set-document');
const checkAuth = require('../middleware/check-auth');

router
  .route('')
  .get(routeProtect, ProjectController.getAllProjects)
  .post(routeProtect, ProjectController.createProject);

router
  .route('/:id')
  .get(routeProtect, ProjectController.getProject)
  .patch(
    routeProtect,
    setDocument(Project),
    checkAuth,
    ProjectController.updateProject
  )
  .delete(
    routeProtect,
    setDocument(Project),
    checkAuth,
    ProjectController.deleteProject
  );

module.exports = router;
