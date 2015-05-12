var express = require('express'),
    pg = require('pg');
// TODO: Move connection string out to config file

var routes = function(connectionString) {
  var router = express.Router();

  // GET all formulas sorted by ID
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

  // POST a formula - name and formula required
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

  // PUT on a specific id - must be a number
  router.put('/:_id(\\d+)', function(req, res) {
    
    // Make sure that name and formula are provided
    if(!req.body.name || !req.body.formula) {
      res.status(400);
      res.send('Name and formula required');
    } else {    
      var results = [];
      
      // Get url param for ID
      var id = req.params._id;
      
      // Get body data from request
      var data = { name: req.body.name, formula: req.body.formula };
      
      // Get a connection to db
      pg.connection(connectionString, function(err, client, done) {
        
        // SQL Update data
        client.query("UPDATE formulas SET name=($1), formula=($2) WHERE id=($3)",
            [data.name, data.formula, id]);
        
        // SQL get updated record
        var query = client.query("SELECT * FROM formulas WHERE id=($1)",
            [id]);
        
        // Stream results
        query.on('row', function(row) {
          results.push(row);
        });

        // On close return
        query.on('end', function() {
          client.end();
          return res.json(results);
        });

        if(err) {
          console.log(err);
        }
      });
    }
  });
 
  // DELETE by id - must be a number
  router.delete('/:_id(\\d+)', function(req, res) {
    var id = req.params._id;
    
    // Get a connection to db
    pg.connect(connectionString, function(err, client, done) {

      // SQL DELETE
      var query = client.query("DELETE FROM formulas WHERE id=(1$)", [id]);

      // If error then return error
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      // Return if OK
      return res.sendStatus(200);
    });
  });


  return router;
};
module.exports = routes;

