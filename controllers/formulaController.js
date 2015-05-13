var formulaController = function(Formula) {

  // GET route [/api/formulas]
  var get = function(req, res) {

    Formula.find(function(err, formulas){

      // Log errors
      if(err) {
        console.log(err);
      } else {

        var returnFormulas = [];

        // Add a link for GET by id to return JSON
        formulas.forEach(function(element, index, array) {

          // Get entry as JSON object and add link
          var newFormula = element.toJSON();
          // links{} must be added before links.self can be created
          newFormula.links = {};
          newFormula.links.self = 'http://' +
            req.headers.host + '/api/formulas/' + newFormula._id;

          // Add new JSON object to return array
          returnFormulas.push(newFormula);
        });

        // Return array in JSON format
        res.json(returnFormulas);
      }
    });
  };

  // POST route [/api/formulas] { name: 'name', formula: 'formula' }
  var post = function(req, res) {

    // Get the post data from the body
    var formula = new Formula(req.body);

    // Return an error if there is missing data, else save data
    if(!req.body.name || !req.body.formula) {
      res.status(400);
      res.send('The fields name and formula are required');
    } else {
      formula.save();
      res.status(201);
      res.send(formula);
    }
  };


  // Allow post and get to be accessed
  return {
    post: post,
    get: get
  };
};

module.exports = formulaController;
