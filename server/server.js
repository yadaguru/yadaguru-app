var express  = require('express'),
    mongoose = require('mongoose'),
    config   = require('./config/config.js')(),
    app      = require('./config/express.js')(config.clientPath);

require('./config/passport.js')();

require('./config/expressRoutes.js')(app);

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
