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

router.post('/api/users/:user_id/schools', function(req, res) {

  var results = [];

  var user_id = req.params.user_id;
  
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

    client.query("INSERT INTO schools (name, due_date, is_active, user_id) VALUES ($1, $2, $3, $4)", [data.name, data.due_date, true, user_id]);
    client.query("UPDATE reminders SET user_id = $1", [user_id]);

    var query = client.query("SELECT * FROM schools WHERE user_id = $1 ORDER BY id ASC", [user_id]);

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });
  })

});

router.get('/api/users/:user_id/schools', function(req, res) {

  var results = [];

  var user_id = req.params.user_id;

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    var query = client.query("SELECT * FROM schools WHERE user_id = $1 ORDER BY id ASC", [user_id]);
    console.log('foobar');

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });

  });

});

router.put('/api/users/schools/:school_id', function(req, res) {

  var results = [];
  var id = req.params.school_id;
  var user_id = req.params.user_id;

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
  updateString += ' WHERE id=($' + i + ') AND user_id = ($' + (i + 1) + ')';
  updateValues.push(id, user_id);

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

    var query = client.query("SELECT * FROM schools WHERE id = $1 AND user_id = $2 ORDER BY id ASC", [id, user_id]);

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });

  });

});

router.delete('/api/users/:user_id/schools/:school_id', function(req, res) {

  var results = [];
  var id = req.params.school_id;
  var user_id = req.params.user_id;

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    client.query("DELETE FROM schools WHERE id=($1) AND user_id = ($2)", [id, user_id]);

    var query = client.query("SELECT * FROM schools WHERE user_id = $1 ORDER BY id ASC", [user_id]);

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });

  });
});

router.get('/api/users/:user_id/reminders', function(req, res) {

  var results = [];
  var user_id = req.params.user_id;

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    var query = client.query("SELECT * FROM reminders WHERE user_id = $1 ORDER BY due_date ASC", [user_id]);

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

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    var query = client.query("INSERT INTO users DEFAULT VALUES RETURNING id");

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });
  })

});

router.put('/api/users/:id', function(req, res) {
  var results = [];
  var id = req.params.id;

  if (Object.keys(req.body).length === 0 && JSON.stringify(req.body) === JSON.stringify({})) {
    return res.json({});
  }

  var data = {
    phone_number: req.body.phone_number,
    personal_code: req.body.personal_code,
    sponsor_code: req.body.sponsor_code,
    confirm_code: req.body.confirm_code
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
  updateString += ' WHERE id=($' + i + ')';
  updateValues.push(id);

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

    var query = client.query("SELECT * FROM users WHERE id = $1 ORDER BY id ASC", [id]);

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });

  });

});

router.delete('/api/users/:id', function(req, res) {

  var results = [];
  var id = req.params.id;

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    client.query("DELETE FROM schools WHERE user_id=($1)", [id]);
    client.query("UPDATE reminders SET user_id = 0");
    client.query("DELETE FROM users WHERE id=($1)", [id]);

    var query = client.query("SELECT * FROM schools WHERE id = $1 ORDER BY id ASC", [id]);

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });

  });
});

router.get('/api/content_items/:item_name', function(req, res) {

  var results = [];
  var item_name = req.params.item_name;

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    var query = client.query("SELECT * FROM content_items WHERE name = $1 LIMIT 1", [item_name]);

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
