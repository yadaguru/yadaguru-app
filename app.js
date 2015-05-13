var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var db;
if(process.env.NODE_ENV =='TEST'){
  db = mongoose.connect('mongodb://localhost/yadaguru_test');
} else {
  db = mongoose.connect('mongodb://localhost/yadaguru');
}

var Formula = require('./models/formula');

var port = process.env.PORT || 3000;

var app = express();
app.use(express.static(__dirname + '/yadaApp'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

formulaRouter = require('./routes/formulaRoutes')(Formula);

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
