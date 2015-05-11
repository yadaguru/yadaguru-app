var express = require('express'),
    bodyParser = require('body-parser'),
    nconf = require('nconf');

// nconf arg order
// 1. Command-line
// 2. Env
// 3. Conf file config.json
nconf.argv()
     .env()
     .file({ file: 'config.json' });

console.log('database: ' + nconf.get('database:host'));

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
