var mongoose = require('mongoose'),
    Reminder = require('./models/reminder'),
    fs = require('fs');

var db;
db = mongoose.connect('mongodb://localhost/yadaguru');

if(process.argv.indexOf('drop') > -1) { 
  mongoose.connection.on('open', function(){
    mongoose.connection.db.dropDatabase(function (err) {
      console.log(err);
    });  
  });
}

var lines = fs.readFileSync('./seed.csv').toString().split('\n');
for (var i = 0; i < lines.length; i++) {
  if (lines[i] === '') {
    continue;
  }
  var splitArray = lines[i].split('_');
  var reminder = new Reminder({
    field: splitArray[0],
    fullName: splitArray[1],
    message: splitArray[2],
    detail: splitArray[3],
    formula: splitArray[4]
  });
  reminder.save();
}

process.exit();
