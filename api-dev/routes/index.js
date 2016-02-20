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

    client.query("INSERT INTO schools (name, due_date, is_active) VALUES ($1, $2, $3)", [data.name, data.due_date, true]);

    var query = client.query("SELECT * FROM schools ORDER BY id ASC");

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

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    var query = client.query("SELECT * FROM schools ORDER BY id ASC");

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

router.delete('/api/schools/:school_id', function(req, res) {

  var results = [];
  var id = req.params.school_id;

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    client.query("DELETE FROM schools WHERE id=($1)", [id]);

    var query = client.query("SELECT * FROM schools ORDER BY id ASC");

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

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    var query = client.query("SELECT * FROM reminders ORDER BY timeframe ASC");

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

module.exports = router;
