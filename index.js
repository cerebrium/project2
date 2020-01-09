
require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const passport = require('./config/ppCinfig');
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const helmet = require('helmet');
const db = require('./models');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const RateLimit = require('express-rate-limit');
const methodOverride = require('method-override')

// middleware
app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(ejsLayouts);
app.use(helmet());
app.use(methodOverride('_method'));

// have ot make limiters
// const loginLimiter = new RateLimit({
//   windowMs: 1000 * 60 * 5,
//   max: 3,
//   message: 'Maximum Loggin Attempts EXCEEDid'
// });

// const signupLimiter = new RateLimit({
//   windowMs: 1000 * 60 * 60,
//   max: 3,
//   message: 'maximum amount of accounts reached'
// });

// app.use('/auth/login', loginLimiter);
// app.use('/auth/signup', signupLimiter)

const sessionStore = new SequelizeStore({
  db: db.sequelize,
  expiration: 1000 * 60 * 30,
})

// session must come before flash and passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
}));

// Use this line once to set up store table
sessionStore.sync();

// must come after session but before passport
app.use(flash());

// passport initializaiton
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.use(express.static('static'));
// middleware ended, app getting
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

app.use('/auth', require('./controllers/auth'));
app.use(`/compcoll`, require(`./controllers/routes`))

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
