// Global declarations for linters
/* global __dirname */
/* global process */

var express     = require('express'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    app         = express(), // Define app with express
    db;

// Mongo connection string set if one not specified in MONGOCONNSTR
var mongoConnStr = process.env.MONGOCONNSTR || 'mongodb://localhost/yadaguru';
db = mongoose.connect(mongoConnStr);

// Define Angular app folder as static content
app.use(express.static(__dirname + '/yadaApp'));
// Configure app with bodyParser to get POST data
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Use port 3000 if no PORT environment variable set
var port = process.env.PORT || 3000;

// Grab a instance of the DB model
var Reminder = require('./server/models/reminder');

// Use the DB model to get an instance of the router
var reminderRouter = require('./server/routes/reminderRoutes')(Reminder);

// All of the routes in reminderRouter will be prefixed with /api/reminders
app.use('/api/reminders', reminderRouter);

// Basic GET to serve static index.html
app.get('/', function (req, res) {
  res.sendFile('./yadaApp/index.html');
});

// API Test route
app.get('/api', function (req, res) {
  res.send('42');
});

// Start the server and display a message to the console
app.listen(port, function () {
  console.log('Running on PORT: ' + port);
});

// Export app for use in testing
module.exports = app;