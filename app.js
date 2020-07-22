const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv').config();
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { urlencoded, json } = require('express');
const connectDB = require('./db');

const app = express();
// Database
connectDB();
// Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Moment 4 Date
const { formatDate } = require('./helper/hbs');
// Views
app.engine(
  '.hbs',
  exphbs({ helpers: { formatDate }, defaultLayout: 'main', extname: '.hbs' }),
);
app.set('view engine', '.hbs');

// Static File
app.use(express.static(path.join(__dirname, 'public')));

//  Express Session
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
);

// Passport Session Config
app.use(passport.initialize());
app.use(passport.session());

// Passport Config
require('./config/passport')(passport);

// Route Middleware
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

// listen to Server
app.listen(process.env.PORT, () => {
  console.log('Server is now running....................');
});
