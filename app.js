var express = require('express'),
    bodyParser = require('body-parser'),
    nconf = require('nconf');

var database = process.env.NODE_DB || 'postgresql';

// nconf arg order
// 1. Command-line
// 2. Env
// 3. Conf files 
nconf.argv()
     .env();
nconf.file('db', 'config/db/' + database + '.json' );

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/yadaApp'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

formulaRouter = require('./routes/' + database + 'FormulaRouter')(
    nconf.get('connectionString'));

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
