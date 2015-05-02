var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

//formulaRouter = require('.routes/formulaRouter')();

//app.use('/api/formulas', formulaRouter);

app.get('/api', function (req, res) {
  res.send('42');
});

app.listen(port, function () {
  console.log('Running on PORT: ' + port);
});

module.exports = app;
