var express = require('express');

var routes = function(TestDate) {
  var router = express.Router();

  var testDateController = require('../controllers/testDateController')(TestDate);

  // GET and POST on [/] can be found in the controller
  router.route('/')
    .get(testDateController.get)
    .post(testDateController.post);

  // Middleware to use for all requests
  // Before reaching the route, find the testDate by ID and pass it up
  router.use('/:_id', function(req, res, next) {
    TestDate.findById(req.params._id, function(err, testDate) {
      
      // If there is an error send the 500 and error message
      // If there is a testDate found add it to the request and hand it up the
      // pipeline
      // Else return a 404 if no testDate found
      if(err) {
        res.status(500).send(err);
      } else if(testDate) {
        req.testDate = testDate;
        next();
      } else {
        res.status(404).send('No testDate found');
      }
    });
  });

  // GET/PUT/DELETE by id
  router.route('/:_id')

    // For get requests just return the data
    .get(function(req, res) {
      res.json(req.testDate);
    })

    // For update PUT requests process and return new data
    .put(function(req, res) {

      // If the data being passed up has an _id field, remove it
      if(req.body._id) {
        delete req.body._id;
      }
      
      // Take data from body and replace data in testDate object
      // retrieved earlier
      for(var key in req.body) {
        req.testDate[key] = req.body[key];
      }

      // Save new testDate object and return
      req.testDate.save(function(err) {
        if(err) {
          res.status(500).send(err);
        } else {
          res.json(req.testDate);
        }
      });
    })

    // Attempt to remove item from db
    .delete(function(req, res) {
      req.testDate.remove(function(err) {
        if(err) {
          res.status(500).send(err);
        } else {
          res.status(204).send('Removed');
        }
      });
    });
  
  return router;
};

module.exports = routes;
