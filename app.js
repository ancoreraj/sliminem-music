const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const dotenv = require('dotenv')
const path = require('path')

const app = express();
dotenv.config({ path: './config.env' })

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
// Connect flash
app.use(flash());


const admin = require("firebase-admin");
const serviceAccountKey = require('./serviceAccountKey')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
});

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));

