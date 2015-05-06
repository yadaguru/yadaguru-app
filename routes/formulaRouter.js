var express = require('express'),
    pg = require('pg');
// TODO: Move connection string out to config file
var connectionString = process.env.DATABASE_URL ||
  'postgres://vagrant:vagrant@localhost:5432/yadaguru';

var routes = function() {
  var router = express.Router();
  router.get('/', function(req, res) {
    var results = [];
    pg.connect(connectionString, function(err, client, done) {
      if(err) {
        console.log('Error fetching client from pool', err);
        return res.status(500);
      }
      var query = client.query("SELECT * FROM formulas ORDER BY id ASC");
      query.on('row', function(row) {
        results.push(row);
      });
      query.on('end', function() {
        client.end();
        return res.json(results);
      });
    });
  });

  router.post('/', function(req, res) {
    if(!req.body.name || !req.body.formula) {
      res.status(400);
      res.send('Name and formula required');
    } else { 
      var results = [];
      var data = { name: req.body.name, formula: req.body.formula };
      console.log(data);
      pg.connect(connectionString, function(err, client, done) {
        if(err) {
          console.error('Error fetching client form pool', err);
          return res.status(500);
        }
        client.query("INSERT INTO formulas(name, formula) values($1, $2)",
            [data.name, data.formula]);
        var query = client.query("SELECT * FROM formulas ORDER BY id ASC");
        query.on('row', function(row) {
          results.push(row);
        });
        query.on('end', function() {
          client.end();
          return res.json(results);
        });
      });
    }
  });

  return router;
};
module.exports = routes;

