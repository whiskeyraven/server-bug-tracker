const express = require('express');
const router = express.Router();

const BugController = require('../controllers/bugs');

// const Bug = require('../models/bug');
// const checkAuth = require('../middleware/check-auth');

// Get all bugs
router.get('', BugController.getAllBugs);
// router.get('', checkAuth, BugController.getAllBugs);

// Get bug by ID
router.get('/:id', BugController.getBugById);
// router.get('', checkAuth, BugController.getBugById);

// Create a new bug
router.post('', BugController.createBug);
// router.bug('', checkAuth, BugController.createBug);

// Update an existing bug
router.patch('/:id', BugController.updateBug);

// Delete bug
router.delete('/:id', BugController.deleteBug);
// router.delete('/:id', checkAuth, BugController.deleteBug);

module.exports = router;