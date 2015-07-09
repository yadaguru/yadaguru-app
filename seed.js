var args     = require('yargs').argv,
    fs       = require('fs'),
    mongoose = require('mongoose'),
    util     = require('util'),
    path     = require('path');

//TODO: Add helpful help messages
var dbname = args.dbname || 'yadaguru';
var adminuser = args.adminuser || 'yada';
var adminpass = args.adminpass || 'guru';
var seedFolder = args._[0] || 'seeds';

var userconn = mongoose.createConnection('mongodb://localhost/' + dbname);
userconn.on('connected', function() {
  var User = require('./server/models/user');
  userconn.model('User', User).remove({}, function(err) {
    if (err) {
      console.log(err);
      userconn.close();
      return;
    }
    console.log('User collection cleared');
    var User = require('./server/models/user');
    var salt, hash;
    salt = User.createSalt();
    hash = User.hashPwd(salt, adminpass);
    userconn.model('User', User).create({ username: adminuser, salt: salt,
      hashedPassword: hash, roles:['admin'] }, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Admin user seeded');
      }
      userconn.close();
    });
  });
});

fs.readdir(seedFolder, function(err, files) {
  if (err) {
    console.log(err);
    return;
  }
  files.forEach(function(file) {
    var dirconn = mongoose.createConnection('mongodb://localhost/' + dbname);

    dirconn.on('connected', function() {
      var fileNoExt = file.replace(/\.[^/.]+$/, "");
      var connmodel = dirconn.model(fileNoExt,
        require('./server/models/' + fileNoExt.toLowerCase()));

      connmodel.remove({}, function (err) {
        if (err) {
          console.log(err);
          dirconn.close();
          return;
        }
        console.log(fileNoExt + ' cleared');
        var obj = JSON.parse(fs.readFileSync(path.join(seedFolder, file), 'utf8'));

        connmodel.create(obj, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log(fileNoExt + ' seeded');
          }
          dirconn.close();
        });
      });
    });
  });
});
