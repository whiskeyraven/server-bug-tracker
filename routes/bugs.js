const express = require('express');
const router = express.Router();

const BugController = require('../controllers/bugs');

// const Bug = require('../models/bug');
// const checkAuth = require('../middleware/check-auth');

// Get all bugs
router.get('', BugController.getAllBugs);
// router.get('', checkAuth, BugController.getAllBugs);

// Create a new bug
// router.bug('', checkAuth, BugController.createBug);

// Delete bug
// router.delete('/:id', checkAuth, BugController.deleteBug);

module.exports = router;