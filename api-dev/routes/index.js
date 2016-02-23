if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}


var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://yadaguru_api_dev:abcd1234@localhost:5432/yadaguru_api_dev';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/schools', function(req, res) {

  var results = [];
  
  var user_uuid = req.query.user_uuid;
  
  var data = {
    name: req.body.name,
    due_date: req.body.due_date,
    is_active: req.body.is_active
  };

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    client.query("INSERT INTO schools (name, due_date, is_active, user_uuid) VALUES ($1, $2, $3, $4)", [data.name, data.due_date, true, user_uuid]);
    client.query("UPDATE reminders SET user_uuid = $1", user_uuid);

    var query = client.query("SELECT * FROM schools WHERE user_uuid = $1 ORDER BY id ASC", user_uuid);

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });
  })

});

router.get('/api/schools', function(req, res) {

  var results = [];

  var user_uuid = req.query.user_uuid;

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    var query = client.query("SELECT * FROM schools WHERE user_uuid = $1 ORDER BY id ASC", user_uuid);

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });

  });

});

router.put('/api/schools/:school_id', function(req, res) {

  var results = [];
  var id = req.params.school_id;
  var user_uuid = req.query.user_uuid;

  var data = {
    name: req.body.name,
    due_date: req.body.due_date,
    is_active: req.body.is_active
  };
  
  var updateString = 'UPDATE schools SET';
  var updateValues = [];
  var i = 1;
  
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      if (typeof(data[key]) !== 'undefined') {
        updateString += ' ' + key + '=($' + i + '),';
        updateValues.push(data[key]);
        i++;
      }
    }
  }

  updateString = updateString.slice(0, -1);
  updateString += ' WHERE id=($' + i + ') AND user_uuid = ($' + (i + 1) + ')';
  updateValues.push(id, user_uuid);

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    client.query(updateString, updateValues);

    var query = client.query("SELECT * FROM schools WHERE id = $1 AND user_uuid = $2 ORDER BY id ASC", [id, user_uuid]);

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });

  });

});

router.delete('/api/schools/:school_id', function(req, res) {

  var results = [];
  var id = req.params.school_id;
  var user_uuid = req.query.user_uuid;

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    client.query("DELETE FROM schools WHERE id=($1) AND user_uuid = ($2)", [id, user_uuid]);

    var query = client.query("SELECT * FROM schools WHERE user_uuid = $1 ORDER BY id ASC", [user_uuid]);

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });

  });
});

router.get('/api/reminders', function(req, res) {

  var results = [];
  var user_uuid = req.query.user_uuid

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    var query = client.query("SELECT * FROM reminders WHERE user_uuid = $1 ORDER BY timeframe ASC", [user_uuid]);

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {

      var groupedResults = [];

      results.forEach(function(result) {

        var groupIndex = groupedResults.findIndex(function(group) {

          return group.timeframe === result.timeframe;

        });

        if (groupIndex < 0) {

          var newGroup = {
            timeframe: result.timeframe,
            reminders: [{
              id: result.id,
              name: result.name,
              message: result.message,
              detail: result.detail
            }]
          };

          groupedResults.push(newGroup);

        } else {

          var reminder = {
            id: result.id,
            name: result.name,
            message: result.message,
            detail: result.detail
          };

          groupedResults[groupIndex].reminders.push(reminder);

        }

      });

      done();
      return res.json(groupedResults);

    });

  });

});

router.post('/api/users', function(req, res) {

  var results = [];

  var data = {
    uuid: req.body.uuid,
    phone_number: req.body.phone_number
  };

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    client.query("INSERT INTO users (uuid, phone_number) VALUES ($1, $2)", [data.uuid, data.phone_number]);

    var query = client.query("SELECT * FROM users WHERE uuid = $1 ORDER BY id ASC", uuid);

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });
  })

});

router.put('/api/users/:uuid', function(req, res) {

  var results = [];
  var uuid = req.params.uuid;

  var data = {
    phone_number: req.body.phone_number,
    personal_code: req.body.personal_code,
    sponsor_code: req.body.sponsor_code
  };

  var updateString = 'UPDATE users SET';
  var updateValues = [];
  var i = 1;

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      if (typeof(data[key]) !== 'undefined') {
        updateString += ' ' + key + '=($' + i + '),';
        updateValues.push(data[key]);
        i++;
      }
    }
  }

  updateString = updateString.slice(0, -1);
  updateString += ' WHERE uuid=($' + i + ')';
  updateValues.push(uuid);

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    client.query(updateString, updateValues);

    var query = client.query("SELECT * FROM users WHERE uuid = $1 ORDER BY id ASC", [uuid]);

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });

  });

});

router.delete('/api/users/:uuid', function(req, res) {

  var results = [];
  var uuid = req.params.uuid;

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    client.query("DELETE FROM users WHERE uuid=($1)", [uuid]);
    client.query("UPDATE reminders SET user_uuid = 'temp'");

    var query = client.query("SELECT * FROM schools WHERE uuid = $1 ORDER BY id ASC", [uuid]);

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });

  });
});
module.exports = router;
