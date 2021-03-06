var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// call library
var hbs = require('express-handlebars');
var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var expressValidator = require('express-validator');
var expressSession = require('express-session');

var app = express();

// view engine setup
// put  new engine handlebars
/*
  extaname --> specify extension of the files, recognize what is handlebars
  defaultLayout--> specify what file  I am going to use
 */
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}) );
 app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
/* saveUninitialized is false, the (still empty, because unmodified) session object will not be
 stored in the session store. about resave = :false, save our section if we change something  */
app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false }))
app.use('/', indexRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
