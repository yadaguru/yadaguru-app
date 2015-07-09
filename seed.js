var args     = require('yargs').argv,
    fs       = require('fs'),
    mongoose = require('mongoose'),
    prompt   = require('prompt'),
    util     = require('util');

//TODO: Add helpful help messages
var dbname = args.dbname || 'yadaguru';
var collectionName = args.collection || 'reminders';
var adminuser = args.adminuser;
var adminpass = args.adminpass;
var seedFile = args._[0];


// TODO: Use connection pools to allow each call to have its own connection
// This will allow each connection to close its own line and not clash
mongoose.connect('mongodb://localhost/' + dbname);

if (args.clearusers) {
  var User = require('./server/models/user');

  User.remove({}, function (err) {
    console.log('User collection cleared');
  });
}

if (adminuser && adminpass) {
  var User = require('./server/models/user');
  var salt, hash;
  salt = User.createSalt();
  hash = User.hashPwd(salt, adminpass);
  User.create({ username: adminuser, salt: salt, hashedPassword: hash,
                roles:['admin'] });
}

// TODO: Clean up logic
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
    var Collection = require('./server/models/' + modelName);

    // Should this be sync to prevent possible conflict with create?
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
