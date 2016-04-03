var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

var routes = require('./routes/index');
var users = require('./routes/users');

// Setup database connection
var connectionString = 'postgres://yadaguru_api_dev:abcd1234@localhost:5432/yadaguru_api_dev';
var sequelizeOptions = {};
var sequelize = new Sequelize(connectionString, sequelizeOptions);

// Import models
var Category = sequelize.import('models/category');
var Timeframe = sequelize.import('models/timeframe');
var BaseReminder = sequelize.import('models/baseReminder');

// Define relations
var BaseReminderTimeframe = sequelize.define('baseReminder_timeframe');
Category.hasMany(BaseReminder);
BaseReminder.belongsToMany(Timeframe, {through: BaseReminderTimeframe});
Timeframe.belongsToMany(BaseReminder, {through: BaseReminderTimeframe});

// Sync models with database
Category.sync();
Timeframe.sync();
BaseReminder.sync();
BaseReminderTimeframe.sync();


var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(allowCrossDomain);

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
console.log('foo');

module.exports = app;
