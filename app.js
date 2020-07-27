const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

const AppError = require('./util/appError');
const globalErrorHandler = require('./controllers/errorController');

const bugRoutes = require('./routes/bugs');
const userRoutes = require('./routes/user');
// const commentRoutes = require('./routes/comments');
// const fileRoutes = require('./routes/upload');

const app = express();

mongoose.set('useCreateIndex', true);
mongoose
  .connect(process.env.MONGO_ATLAS_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message:
    'Too many server requests from this IP address.  Please try again in an hour.',
});

app.use(helmet());

app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(express.urlencoded());

// app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/bugs', bugRoutes);
app.use('/api/user', userRoutes);
// app.use('/api/comments', commentRoutes);
// app.use("/api/upload", fileRoutes);
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
