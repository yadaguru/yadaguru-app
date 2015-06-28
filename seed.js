var args     = require('yargs').argv,
    fs       = require('fs'),
    mongoose = require('mongoose'),
    prompt   = require('prompt'),
    util     = require('util');

var dbname = args.dbname || 'yadaguru';
var collectionName = args.collection || 'reminders';
var seedFile = args.file || './seeds/reminders.json';

prompt.start();
var property = {
  name: 'yesno',
  message: util.format('Are you sure you want to clean the collection on database %s named %s?', dbname, collectionName),
  validator: /y[es]*|n[o]?/,
  warning: 'Must respond yes or no',
  default: 'no'
};
prompt.get(property, function (err, result) {
  if (result.yesno === 'yes') {
    mongoose.connect('mongodb://localhost/yadaguru');
    var Reminder = require('./server/models/reminder');
    
    Reminder.remove({}, function (err) {
      console.log('Collection cleared');
    });

    var obj = JSON.parse(fs.readFileSync(seedFile, 'utf8'));


    Reminder.find({}).exec(function (err, collection) {
      if (collection.length === 0) {
        console.log('Seeding DB');
        Reminder.create(obj, function() {
          console.log('Closing DB');
          mongoose.connection.close();
        });            
      } else {
        console.log('Collection not empty');
        mongoose.connection.close();
      }
    });

  } else {
    console.log('Goodbye');
  }
});
