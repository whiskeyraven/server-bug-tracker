const Bug = require('../models/bug')

exports.getAllBugs = (req, res, next) => {
  let fetchedBugs;
  const bugQuery = Bug.find()
    // .populate('creator', 'username')
    // .populate('comments.commentator', 'username')
    .sort({
      created_at: -1
    });
  // if (pageSize && currentPage) {
  //   bugQuery
  //     .skip(pageSize * (currentPage - 1))
  //     .limit(pageSize);
  // }
  bugQuery.then(documents => {
    fetchedBugs = documents.map(document => {
      return {
        id: document._id,
        title: document.title,
        severity: document.severity,
        priority: document.priority,
        status: document.title,
        type: document.type,
        description: document.description,
        owner: document.owner,
        fixer: document.fixer,
        date: document.date
      }
    })
    // return Bug.countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: 'Bugs retrieved successfully',
      bugs: fetchedBugs
    });
  })
  .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
}

exports.getBugById = (req, res, next) => {
  Bug.findById({
    _id: req.params.id
  })
    .then(bug => {
      if (bug) {
        res.status(200).json({
          message: 'Bug retrieved successfully',
          bug: bug
        });
      }
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}

exports.createBug = (req, res, next) => {
  const bug = new Bug({ ...req.body });
  bug.save()
    .then(createdBug => {
      const bug = {
        id: createdBug._id,
        title: createdBug.title,
        severity: createdBug.severity,
        priority: createdBug.priority,
        status: createdBug.title,
        type: createdBug.type,
        description: createdBug.description,
        owner: createdBug.owner,
        fixer: createdBug.fixer,
        date: createdBug.date
      };
      res.status(201).json({
        message: 'Bug added successfully',
        bug: bug
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}

exports.updateBug = (req, res, next) => {
  const id = req.params.id;
  const updatedBug = { ...req.body };
  const options = { new: true }; 
  Bug.findByIdAndUpdate(id, updatedBug, options)
    .then(bug => {
      console.log('then bug', bug);
      if (!bug) {
        return 'Bug not found'
      };
      res.status(200).json({
        message: 'Bug updated successfully',
        updatedBug: bug
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}

exports.deleteBug = (req, res, next) => {
  Bug.deleteOne({
      _id: req.params.id,
      // creator: req.userData.userId
    })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({
          message: 'Bug deleted'
        });
      } else {
        res.status(401).json({
          message: 'Delete not authorized'
        });
      }
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}