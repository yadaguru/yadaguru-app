var express = require('express'),
    account = require('../account');

var routes = function(Settings) {
  var router = express.Router();

  var settingsController = require('../controllers/settingsController')(Settings);

  // GET and POST on [/] can be found in the controller
  router.route('/')
    .get(settingsController.get)
    .post(account.requiresRoleApi('admin'), settingsController.post);

  // Middleware to use for all requests
  // Before reaching the route, find the settings by ID and pass it up
  router.use('/:_id', function(req, res, next) {
    Settings.findById(req.params._id, function(err, settings) {

      // If there is an error send the 500 and error message
      // If there is a settings found add it to the request and hand it up the
      // pipeline
      // Else return a 404 if no settings found
      if(err) {
        res.status(500).send(err);
      } else if(settings) {
        req.settings = settings;
        next();
      } else {
        res.status(404).send('No settings found');
      }
    });
  });

  // GET/PUT/DELETE by id
  router.route('/:_id')

    // For get requests just return the data
    .get(function(req, res) {
      res.json(req.settings);
    })

    // For update PUT requests process and return new data
    .put(account.requiresRoleApi('admin'), function(req, res) {
      
      // If the data being passed up has an _id field, remove it
      if(req.body._id) {
        delete req.body._id;
      }

      // Take data from body and replace data in settings object
      // retrieved earlier
      for(var key in req.body) {
        req.settings[key] = req.body[key];
      }

      // Save new settings object and return
      req.settings.save(function(err) {
        if(err) {
          res.status(500).send(err);
        } else {
          res.json(req.settings);
        }
      });
    })

    // Attempt to remove item from db
    .delete(account.requiresRoleApi('admin'), function(req, res) {
      req.settings.remove(function(err) {
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
