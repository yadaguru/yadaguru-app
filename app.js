var express = require('express'),
    bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/yadaApp'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

formulaRouter = require('./routes/formulaRouter')();

app.use('/api/formulas', formulaRouter);

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
