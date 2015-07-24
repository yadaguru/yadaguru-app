var express  = require('express'),
    mongoose = require('mongoose'),
    config   = require('./config/config.js')(),
    app      = require('./config/express.js')(config.clientPath);

require('./config/passport.js')();

var authRouter = require('./routes/authRoutes')();
app.use('/api/auth', authRouter);

var userRouter = require('./routes/userRoutes')();
app.use('/api/users', userRouter);

var Reminder = require('./models/reminder');
var reminderRouter = require('./routes/reminderRoutes')(Reminder);
app.use('/api/reminders', reminderRouter);

var TestDate = require('./models/testdate');
var testDateRouter = require('./routes/testDateRoutes')(TestDate);
app.use('/api/test-dates', testDateRouter);

var TestMessage = require('./models/testmessage');
var testMessageRouter = require('./routes/testMessageRoutes')(TestMessage);
app.use('/api/test-messages', testMessageRouter);

var Category = require('./models/category');
var CategoryRouter = require('./routes/categoryRoutes')(Category);
app.use('/api/categories', CategoryRouter);

var Faq = require('./models/faq');
var faqRouter = require('./routes/faqRoutes')(Faq);
app.use('/api/faqs', faqRouter);

var exportRouter = require('./routes/exportRoutes')();
app.use('/api/export', exportRouter);

app.get('/', function (req, res) {
  res.sendFile(config.clientPath + '/root/index.html');
});

app.get('/login', function(req, res) {
  res.sendFile(config.clientPath + '/login/index.html');
});

app.get('/admin', function(req, res) {
  res.sendFile(config.clientPath + '/admin/index.html');
});

app.listen(config.port, function () {
  console.log('Running on PORT: ' + config.port);
});

module.exports = app;
