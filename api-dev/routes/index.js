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

// POST schools
router.post('/api/users/:user_id/schools', function(req, res) {

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

    var schoolInsertQuery = client.query("INSERT INTO schools (name, due_date, is_active, user_id) VALUES ($1, $2, $3, $4) RETURNING id", [data.name, data.due_date, true, user_id]);
    var schoolId;

    schoolInsertQuery.on('row', function(row) {
      schoolId = row.id;
    });

    schoolInsertQuery.on('end', function() {

      client.query("UPDATE reminders SET school_id = $1, user_id = $2", [schoolId, user_id]);
      var schoolResults = [];
      var schoolQuery = client.query("SELECT * FROM schools WHERE user_id = $1 ORDER BY id ASC", [user_id]);

      schoolQuery.on('row', function(row) {
        schoolResults.push(row);
      });

      schoolQuery.on('end', function() {
        done();
        return res.json(schoolResults);
      });
    });
  });
});

// GET Schools
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

// PUT schools
router.put('/api/users/:user_id/schools/', function(req, res) {

  var results = [];
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
        console.log(i, data[key]);
        updateString += ' ' + key + '=($' + i + '),';
        updateValues.push(data[key]);
        i++;
      }
    }
  }

  updateString = updateString.slice(0, -1);
  updateString += ' WHERE user_id = ($' + (i) + ')';
  updateValues.push(user_id);
  console.log(updateString);
  console.log(updateValues);

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

// PUT school
router.put('/api/users/:user_id/schools/:school_id', function(req, res) {

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

// DELETE schools
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

// GET Reminders
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

// GET Reminders for school
router.get('/api/users/:user_id/reminders/schools/:school_id', function(req, res) {

  var results = [];
  var user_id = req.params.user_id;
  var school_id = req.params.school_id;

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    var query = client.query("SELECT * FROM reminders WHERE user_id = $1 AND school_id = $2 ORDER BY due_date ASC", [user_id, school_id]);

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {

      var groupedResults = [];
      var schoolQuery = client.query("SELECT name, due_date FROM schools WHERE id = $1", [school_id]);
      var schoolName, schoolDate;

      schoolQuery.on('row', function(row) {
        schoolName = row.name;
        schoolDate = row.due_date;
      });

      schoolQuery.on('end', function() {

        groupedResults.push({
          school: schoolName,
          due_date: schoolDate,
          grouped_reminders: []
        });

        results.forEach(function(result) {

          var groupIndex = groupedResults[0].grouped_reminders.findIndex(function(group) {

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

            groupedResults[0].grouped_reminders.push(newGroup);

          } else {

            var reminder = {
              id: result.id,
              name: result.name,
              message: result.message,
              detail: result.detail
            };

            groupedResults[0].grouped_reminders[groupIndex].reminders.push(reminder);

          }

        });

        done();
        return res.json(groupedResults);
      });


    });

  });

});

// POST user
router.post('/api/users', function(req, res) {

  var results = [];
  var data = {
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

    var query = client.query("INSERT INTO users (phone_number) VALUES ($1) RETURNING id", [data.phone_number]);

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });
  })

});

// PUT user
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

// DELETE user
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

    client.query("UPDATE reminders SET user_id = NULL school_id = NULL", []);
    client.query("DELETE FROM schools WHERE user_id=($1)", [id]);
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

// GET content-items
router.get('/api/content-items/:item_name', function(req, res) {

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

// GET base_reminders
router.get('/api/base_reminders', function(req, res) {

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

    var query = client.query("SELECT id, name, message, detail, late_message, late_detail, category_id AS category FROM base_reminders");

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {

      var timeframesQuery = client.query("SELECT base_reminder_id, timeframe_id FROM base_reminders_timeframes", []);

      timeframesQuery.on('row', function(timeframeRow) {
        var reminderId = results.findIndex(function(el) {
          return el.id === timeframeRow.base_reminder_id;
        });
        if (reminderId !== -1) {
          if (!results[reminderId].hasOwnProperty('timeframes')) {
            results[reminderId].timeframes = [];
          }
          results[reminderId].timeframes.push(timeframeRow.timeframe_id);
        }
      });

      timeframesQuery.on('end', function() {
        done();
        return res.json(results);
      });

    });

  });

});

// GET base_reminder
router.get('/api/base_reminders/:base_reminder_id', function(req, res) {

  var results = [];
  var baseReminderId = req.params.base_reminder_id;

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    var query = client.query("SELECT id, name, message, detail, late_message, late_detail, category_id AS category " +
        "FROM base_reminders WHERE id = $1", [baseReminderId]);

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {

      var timeframesQuery = client.query("SELECT base_reminder_id, timeframe_id FROM base_reminders_timeframes " +
          "WHERE base_reminder_id = $1", [baseReminderId]);

      timeframesQuery.on('row', function(timeframeRow) {
        var reminderId = results.findIndex(function(el) {
          return el.id === timeframeRow.base_reminder_id;
        });
        if (reminderId !== -1) {
          if (!results[reminderId].hasOwnProperty('timeframes')) {
            results[reminderId].timeframes = [];
          }
          results[reminderId].timeframes.push(timeframeRow.timeframe_id);
        }
      });

      timeframesQuery.on('end', function() {
        done();
        return res.json(results);
      });

    });

  });

});

// POST base_reminders
router.post('/api/base_reminders', function(req, res) {

  var data = {
    name: req.body.name,
    message: req.body.message,
    detail: req.body.detail,
    late_message: req.body.late_message,
    late_detail: req.body.late_detail,
    category: req.body.category,
    timeframes: req.body.timeframes
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

    var query = client.query("INSERT INTO base_reminders (name, message, detail, late_message, late_detail, category_id) " +
        "VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        [data.name, data.message, data.detail, data.late_message, data.late_detail, data.category]);
    var newBaseReminderId;

    query.on('row', function(row) {
      newBaseReminderId = row.id;
    });

    query.on('end', function() {

      var results = [];

      if (data.timeframes) {
        data.timeframes.forEach(function(timeframe) {
          client.query("INSERT INTO base_reminders_timeframes (base_reminder_id, timeframe_id) " +
          "VALUES ($1, $2)", [newBaseReminderId, timeframe]);
        });
      }

      var baseReminderQuery = client.query("SELECT id, name, message, detail, late_message, late_detail, category_id AS category " +
          "FROM base_reminders", []);

      baseReminderQuery.on('row', function(row) {
        results.push(row);
      });

      baseReminderQuery.on('end', function() {

        var timeframesQuery = client.query("SELECT base_reminder_id, timeframe_id FROM base_reminders_timeframes", []);

        timeframesQuery.on('row', function(timeframeRow) {
          var reminderId = results.findIndex(function(el) {
            return el.id === timeframeRow.base_reminder_id;
          });
          if (reminderId !== -1) {
            if (!results[reminderId].hasOwnProperty('timeframes')) {
              results[reminderId].timeframes = [];
            }
            results[reminderId].timeframes.push(timeframeRow.timeframe_id);
          }
        });

        timeframesQuery.on('end', function() {
          done();
          return res.json(results);
        });

      });

    });
  });
});

// PUT base reminder
router.put('/api/base_reminders/:base_reminder_id', function(req, res) {

  var results = [];
  var id = req.params.base_reminder_id;

  var data = {
    name: req.body.name,
    message: req.body.message,
    detail: req.body.detail,
    late_message: req.body.late_message,
    late_detail: req.body.late_detail,
    category: req.body.category,
    timeframes: req.body.timeframes
  };

  var timeframes;

  if (data.hasOwnProperty('timeframes')) {
    timeframes = data.timeframes;
    delete data.timeframes;
  }

  var updateString = 'UPDATE base_reminders SET';
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

    var updateQuery = client.query(updateString, updateValues);

    updateQuery.on('end', function() {

      if (typeof timeframes !== 'undefined') {

        client.query("DELETE FROM base_reminders_timeframes WHERE base_reminder_id = $1", [id]);
        timeframes.forEach(function(timeframe) {
          client.query("INSERT INTO base_reminders_timeframes (base_reminder_id, timeframe_id) " +
              "VALUES ($1, $2)", [id, timeframe]);
        });
      }

      var baseReminderQuery = client.query("SELECT id, name, message, detail, late_message, late_detail, category_id AS category " +
          "FROM base_reminders", []);

      baseReminderQuery.on('row', function(row) {
        results.push(row);
      });

      baseReminderQuery.on('end', function() {

        var timeframesQuery = client.query("SELECT base_reminder_id, timeframe_id FROM base_reminders_timeframes", []);

        timeframesQuery.on('row', function(timeframeRow) {
          var reminderId = results.findIndex(function(el) {
            return el.id === timeframeRow.base_reminder_id;
          });
          if (reminderId !== -1) {
            if (!results[reminderId].hasOwnProperty('timeframes')) {
              results[reminderId].timeframes = [];
            }
            results[reminderId].timeframes.push(timeframeRow.timeframe_id);
          }
        });

        timeframesQuery.on('end', function() {
          done();
          return res.json(results);
        });

      });

    });

  });

});

// DELETE base_reminder
router.delete('/api/base_reminders/:base_reminder_id', function(req, res) {

  var results = [];
  var id = req.params.base_reminder_id;

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    client.query("DELETE FROM base_reminders_timeframes WHERE base_reminder_id = $1", [id]);
    client.query("DELETE FROM base_reminders WHERE id=($1)", [id]);

    var baseReminderQuery = client.query("SELECT id, name, message, detail, late_message, late_detail, category_id AS category " +
        "FROM base_reminders", []);

    baseReminderQuery.on('row', function(row) {
      results.push(row);
    });

    baseReminderQuery.on('end', function() {

      var timeframesQuery = client.query("SELECT base_reminder_id, timeframe_id FROM base_reminders_timeframes", []);

      timeframesQuery.on('row', function(timeframeRow) {
        var reminderId = results.findIndex(function(el) {
          return el.id === timeframeRow.base_reminder_id;
        });
        if (reminderId !== -1) {
          if (!results[reminderId].hasOwnProperty('timeframes')) {
            results[reminderId].timeframes = [];
          }
          results[reminderId].timeframes.push(timeframeRow.timeframe_id);
        }
      });

      timeframesQuery.on('end', function() {
        done();
        return res.json(results);
      });

    });

  });
});

module.exports = router;
