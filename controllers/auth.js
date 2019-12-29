const { validationResult } = require('express-validator/check');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwttoken = require('../config/jwt');

const TOKEN_SECRET = jwttoken.SECRET;

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  bcrypt.hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({ message: 'User created', userId: result._id });
    })
    .catch(err => {
      if (!error.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('Invalid login credentials');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Invalid login credentials');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign({
        email: loadedUser.email,
        userId: loadedUser._id.toString()
      }, TOKEN_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token: token, userId: loadedUser._id.toString() })
    })
    .catch(err => {
      if (!error.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

exports.getUserById = (req, res, next) => {
  User.findById({
    _id: req.params.id
  })
  .then(user => {
    if (user) {
      res.status(200).json({
        message: 'User retrieved successfully',
        user: user
      });
    }
  })
  .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
}

exports.deleteUser = (req, res, next) => {
  User.deleteOne({
      _id: req.params.id,
    })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({
          message: 'User deleted'
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

exports.getAllUsers = (req, res, next) => {
  let fetchedUsers;
  const userQuery = User.find()
    .sort({
      created_at: -1
    });
  userQuery.then(documents => {
    fetchedUsers = documents;
    // fetchedUsers = documents.map(document => {
    //   return {
    //     id: document._id,
    //     title: document.title,
    //     severity: document.severity,
    //     priority: document.priority,
    //     status: document.status,
    //     type: document.type,
    //     description: document.description,
    //     owner: document.owner,
    //     fixer: document.fixer,
    //     date: document.date
    //   }
    // })
    // return User.countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: 'Users retrieved successfully',
      users: fetchedUsers
    });
  })
  .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
}