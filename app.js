
const express = require("express");
const mongoose = require('mongoose');

const bugRoutes = require('./routes/bugs');
const authRoutes = require('./routes/auth');
// const fileRoutes = require('./routes/upload');

const db = require('./config/db');

const app = express();

mongoose.set('useCreateIndex', true);
mongoose.connect(db.mLAB_DB, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.use("/api/bugs", bugRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/upload", fileRoutes);

module.exports = app;