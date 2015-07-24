var express = require('express');

var routes = function(TestMessage) {
  var router = express.Router();

  var testMessageController = require('../controllers/testMessageController')(TestMessage);

  // GET and POST on [/] can be found in the controller
  router.route('/')
    .get(testMessageController.get)
    .post(testMessageController.post);

  // Middleware to use for all requests
  // Before reaching the route, find the testMessage by ID and pass it up
  router.use('/:_id', function(req, res, next) {
    TestMessage.findById(req.params._id, function(err, testMessage) {
      
      // If there is an error send the 500 and error message
      // If there is a testMessage found add it to the request and hand it up the
      // pipeline
      // Else return a 404 if no testMessage found
      if(err) {
        res.status(500).send(err);
      } else if(testMessage) {
        req.testMessage = testMessage;
        next();
      } else {
        res.status(404).send('No testMessage found');
      }
    });
  });

  // GET/PUT/DELETE by id
  router.route('/:_id')

    // For get requests just return the data
    .get(function(req, res) {
      res.json(req.testMessage);
    })

    // For update PUT requests process and return new data
    .put(function(req, res) {

      // If the data being passed up has an _id field, remove it
      if(req.body._id) {
        delete req.body._id;
      }
      
      // Take data from body and replace data in testMessage object
      // retrieved earlier
      for(var key in req.body) {
        req.testMessage[key] = req.body[key];
      }

      // Save new testMessage object and return
      req.testMessage.save(function(err) {
        if(err) {
          res.status(500).send(err);
        } else {
          res.json(req.testMessage);
        }
      });
    })

    // Attempt to remove item from db
    .delete(function(req, res) {
      req.testMessage.remove(function(err) {
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
