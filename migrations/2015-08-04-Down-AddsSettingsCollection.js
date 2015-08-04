(function() {
  
  'use strict';

  var mongo = require('mongodb');
  var monk = require('monk');
  var db = monk('mongodb://localhost/yadaguru');
  var settings = db.get('settings');
  settings.drop();
  db.close();

}());



