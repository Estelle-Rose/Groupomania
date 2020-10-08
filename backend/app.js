const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
//const passport = require('passport');

//routes
const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');

//db
const { sequelize } = require('./models/index');


const app = express();

// Pass the global passport object into the configuration function
//require('./config/passport')(passport);

// This will initialize the passport object on every request
//app.use(passport.initialize());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use('/api', userRoutes);
app.use('/api', postsRoutes);
app.use('/api', commentsRoutes);

const dbTest = async function () {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
dbTest();

module.exports = app;
