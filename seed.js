var mongoose = require('mongoose'),
    Formula = require('./models/formula'),
    fs = require('fs');

var db;
db = mongoose.connect('mongodb://localhost/yadaguru');

if (mongoose.connection.collections.length > 0) {
  for (var i in mongoose.connection.collections) {
    mongoose.connections.collections[i].remove(function (){});
  }
}

var lines = fs.readFileSync('./seed.csv').toString().split('\n');
for (var i = 0; i < lines.length; i++) {
  var splitArray = lines[i].split('_');
  var json = '{' +
    'field:' + splitArray[0] +
    ',fullName:' + splitArray[1] +
    ',message:' + splitArray[2] +
    ',detail:' + splitArray[3] +
    ',formula:' + splitArray[4] + '}';
  var formula = new Formula({"foo" : "bar" });
  formula.save();
}


