var express = require('express'),
    account = require('../account');

var routes = function(Category) {
  var router = express.Router();

  var categoryController = require('../controllers/categoryController')(Category);

  // GET and POST on [/] can be found in the controller
  router.route('/')
    .get(categoryController.get)
    .post(account.requiresRoleApi('admin'), categoryController.post);

  // Middleware to use for all requests
  // Before reaching the route, find the category by ID and pass it up
  router.use('/:_id', function(req, res, next) {
    Category.findById(req.params._id, function(err, category) {

      // If there is an error send the 500 and error message
      // If there is a category found add it to the request and hand it up the
      // pipeline
      // Else return a 404 if no category found
      if(err) {
        res.status(500).send(err);
      } else if(category) {
        req.category = category;
        next();
      } else {
        res.status(404).send('No category found');
      }
    });
  });

  // GET/PUT/DELETE by id
  router.route('/:_id')

    // For get requests just return the data
    .get(function(req, res) {
      res.json(req.category);
    })

    // For update PUT requests process and return new data
    .put(account.requiresRoleApi('admin'), function(req, res) {

      // If the data being passed up has an _id field, remove it
      if(req.body._id) {
        delete req.body._id;
      }

      // Take data from body and replace data in category object
      // retrieved earlier
      for(var key in req.body) {
        req.category[key] = req.body[key];
      }

      // Save new category object and return
      req.category.save(function(err) {
        if(err) {
          res.status(500).send(err);
        } else {
          res.json(req.category);
        }
      });
    })

    // Attempt to remove item from db
    .delete(account.requiresRoleApi('admin'), function(req, res) {
      req.category.remove(function(err) {
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
