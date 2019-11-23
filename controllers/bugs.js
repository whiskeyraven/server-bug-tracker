

exports.getAllBugs = (req, res, next) => {
  console.log('Getting bugs...');
  let fetchedBugs;
  const postQuery = Bug.find()
    // .populate('creator', 'username')
    // .populate('comments.commentator', 'username')
    .sort({
      created_at: -1
    });
  // if (pageSize && currentPage) {
  //   postQuery
  //     .skip(pageSize * (currentPage - 1))
  //     .limit(pageSize);
  // }
  postQuery.then(documents => {
    fetchedBugs = documents;
    // return Bug.countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: 'Bugs retrieved successfully',
      bugs: fetchedBugs
    });

    //TODO remove console logs
    console.log('MESSAGE', message);
    console.log('BUGS', bugs);
  });
}

exports.createBug = (req, res, next) => {
  const post = new Bug({
    post: req.body.post,
    creator: req.userData.userId
  });
  post.save()
    .then(createdBug => {
      res.status(201).json({
        message: 'Bug added successfully',
        post: {
          id: createdBug._id,
        created_at: createdBug.created_at,
          creatorId: createdBug.creator,
          creatorName: req.userData.userName,
          post: createdBug.post,
        comments: []
        }
      });
    });
}

exports.deleteBug = (req, res, next) => {
  Bug.deleteOne({
      _id: req.params.id,
      creator: req.userData.userId
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