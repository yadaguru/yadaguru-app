var express = require('express'),
    account = require('../account');

var routes = function(Faq) {
  var router = express.Router();

  var faqController = require('../controllers/faqController')(Faq);

  // GET and POST on [/] can be found in the controller
  router.route('/')
    .get(faqController.get)
    .post(account.requiresRoleApi('admin'), faqController.post);

  // Middleware to use for all requests
  // Before reaching the route, find the faq by ID and pass it up
  router.use('/:_id', function(req, res, next) {
    Faq.findById(req.params._id, function(err, faq) {

      // If there is an error send the 500 and error message
      // If there is a faq found add it to the request and hand it up the
      // pipeline
      // Else return a 404 if no faq found
      if(err) {
        res.status(500).send(err);
      } else if(faq) {
        req.faq = faq;
        next();
      } else {
        res.status(404).send('No faq found');
      }
    });
  });

  // GET/PUT/DELETE by id
  router.route('/:_id')

    // For get requests just return the data
    .get(function(req, res) {
      res.json(req.faq);
    })

    // For update PUT requests process and return new data
    .put(account.requiresRoleApi('admin'), function(req, res) {

      // If the data being passed up has an _id field, remove it
      if(req.body._id) {
        delete req.body._id;
      }

      // Take data from body and replace data in faq object
      // retrieved earlier
      for(var key in req.body) {
        req.faq[key] = req.body[key];
      }

      // Save new faq object and return
      req.faq.save(function(err) {
        if(err) {
          res.status(500).send(err);
        } else {
          res.json(req.faq);
        }
      });
    })

    // Attempt to remove item from db
    .delete(account.requiresRoleApi('admin'), function(req, res) {
      req.faq.remove(function(err) {
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
