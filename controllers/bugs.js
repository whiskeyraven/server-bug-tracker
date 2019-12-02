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
      console.log(err);
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
    });
}