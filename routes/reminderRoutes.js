var express = require('express');

var routes = function(Reminder) {
  var router = express.Router();

  var reminderController = require('../controllers/reminderController')(Reminder);

  // GET and POST on [/] can be found in the controller
  router.route('/')
    .get(reminderController.get)
    .post(reminderController.post);

  // Before reaching the route, find the reminder by ID and pass it up
  router.use('/:_id', function(req, res, next) {
    Reminder.findById(req.params._id, function(err, reminder) {
      
      // If there is an error send the 500 and error message
      // If there is a reminder found add it to the request and hand it up the
      // pipeline
      // Else return a 404 if no reminder found
      if(err) {
        res.status(500).send(err);
      } else if(reminder) {
        req.reminder = reminder;
        next();
      } else {
        res.status(404).send('No reminder found');
      }
    });
  });

  // GET/PUT/PATCH/DELETE by id
  router.route('/:_id')

    // For get requests just return the data
    .get(function(req, res) {
      res.json(req.reminder);
    })

    // For update PATCH requests process and return new data
    .patch(function(req, res) {

      // If the data being passed up has an _id field, remove it
      if(req.body._id) {
        delete req.body._id;
      }

      // Take data from body and replace data in reminder object
      // retrieved earlier
      for(var key in req.body) {
        req.reminder[key] = req.body[key];
      }

      // Save new reminder object and return
      req.reminder.save(function(err) {
        if(err) {
          res.status(500).send(err);
        } else {
          res.json(req.reminder);
        }
      });
    })

    // Attempt to remove item from db
    .delete(function(req, res) {
      req.reminder.remove(function(err) {
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
