var args     = require('yargs').argv,
    fs       = require('fs'),
    mongoose = require('mongoose'),
    prompt   = require('prompt'),
    util     = require('util');

var dbname = args.dbname || 'yadaguru';
var collectionName = args.collection || 'reminders';
var seedFile = args._[0];

if (!seedFile) {
  console.log('Usage: Enter exactly 1 path to a json seed file');
  return;
}

var collectionName = seedFile.split('/').pop().replace('.json','');
var modelName = collectionName.slice(0, -1);

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
    mongoose.connect('mongodb://localhost/' + dbname);
    var Collection = require('./server/models/' + modelName);
    
    Collection.remove({}, function (err) {
      console.log('Collection cleared');
    });

    var obj = JSON.parse(fs.readFileSync(seedFile, 'utf8'));


    Collection.find({}).exec(function (err, collection) {
      if (collection.length === 0) {
        console.log('Seeding DB');
        Collection.create(obj, function() {
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
