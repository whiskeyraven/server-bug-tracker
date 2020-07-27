const express = require('express');

const router = express.Router();

const Bug = require('../models/bug');
const BugsController = require('../controllers/bugsController');
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
  .get(routeProtect, BugsController.getAllBugs)
  .post(routeProtect, setCreator, BugsController.createBug);

router
  .route('/:id')
  .get(routeProtect, BugsController.getBug)
  .patch(routeProtect, setDocument(Bug), checkAuth, BugsController.updateBug)
  .delete(
    routeProtect,
    setDocument(Bug),
    checkAuth,
    BugsController.deleteBug
  );

module.exports = router;
