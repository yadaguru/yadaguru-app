var express = require('express');

var routes = function(Formula) {
  var router = express.Router();

  var formulaController = require('../controllers/formulaController')(Formula);

  // GET and POST on [/] can be found in the controller
  router.route('/')
    .get(formulaController.get)
    .post(formulaController.post);

  // Before reaching the route, find the formula by ID and pass it up
  router.use('/:_id', function(req, res, next) {
    Formula.findById(req.params._id, function(err, formula) {
      
      // If there is an error send the 500 and error message
      // If there is a formula found add it to the request and hand it up the
      // pipeline
      // Else return a 404 if no formula found
      if(err) {
        res.status(500).send(err);
      } else if(formula) {
        req.formula = formula;
        next();
      } else {
        res.status(404).send('No formula found');
      }
    });
  });

  // GET/PUT/PATCH/DELETE by id
  router.route('/:_id')

    // For get requests just return the data
    .get(function(req, res) {
      res.json(req.formula);
    })

    // For update PATCH requests process and return new data
    .patch(function(req, res) {

      // If the data being passed up has an _id field, remove it
      if(req.body._id) {
        delete req.body._id;
      }

      // Take data from body and replace data in formula object
      // retrieved earlier
      for(var key in req.body) {
        req.formula[key] = req.body[key];
      }

      // Save new formula object and return
      req.formula.save(function(err) {
        if(err) {
          res.status(500).send(err);
        } else {
          res.json(req.formula);
        }
      });
    })

    // Attempt to remove item from db
    .delete(function(req, res) {
      req.formula.remove(function(err) {
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
