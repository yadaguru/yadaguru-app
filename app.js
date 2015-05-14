var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var db;
if(process.env.NODE_ENV =='TEST'){
  db = mongoose.connect('mongodb://localhost/yadaguru_test');
} else {
  db = mongoose.connect('mongodb://localhost/yadaguru');
}

var Reminder = require('./models/reminder');

var port = process.env.PORT || 3000;

var app = express();
app.use(express.static(__dirname + '/yadaApp'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

reminderRouter = require('./routes/reminderRoutes')(Reminder);

app.use('/api/reminders', reminderRouter);

app.get('/', function (req, res) {
  res.sendFile('./yadaApp/index.html');
});

app.get('/api', function (req, res) {
  res.send('42');
});

app.listen(port, function () {
  console.log('Running on PORT: ' + port);
});

module.exports = app;
