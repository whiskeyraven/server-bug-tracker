const express = require('express');

const router = express.Router();

const Bug = require('../models/bug');
const BugController = require('../controllers/bugsController');
// const commentRouter = require('./comments');

const routeProtect = require('../middleware/route-protect');
const setCreator = require('../middleware/set-creator');
const { setDocument } = require('../middleware/set-document');
const checkAuth = require('../middleware/check-auth');

// router.use('/:id/comments', commentRouter);

// TODO integrate and uncomment
// router.use(routeProtect);

router
  .route('')
  .get(routeProtect, BugController.getAllBugs)
  .post(routeProtect, setCreator, BugController.createBug);

router
  .route('/:id')
  .get(BugController.getBug)
  .patch(routeProtect, setDocument(Bug), checkAuth, BugController.updateBug)
  .delete(
    routeProtect,
    setDocument(Bug),
    checkAuth,
    BugController.deleteBug
  );

module.exports = router;
