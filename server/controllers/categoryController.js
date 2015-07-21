var categoryController = function(Category) {

  // GET route [/api/categories]
  var get = function(req, res) {

    Category.find(function(err, categories){

      // Log errors
      if(err) {
        console.log(err);
        res.status(500).send(err);
      } else {

        var returnCategories = [];

        // Add a link for GET by id to return JSON
        categories.forEach(function(element, index, array) {

          // Get entry as JSON object and add link
          var newCategory = element.toJSON();
          // links{} must be added before links.self can be created
          newCategory.links = {};
          newCategory.links.self = 'http://' +
            req.headers.host + '/api/categories/' + newCategory._id;

          // Add new JSON object to return array
          returnCategories.push(newCategory);
        });

        // Return array in JSON format
        res.json(returnCategories);
      }
    }).sort('category');
  };

  // POST route [/api/categories] 
  var post = function(req, res) {

    // Return an error if there is missing data, else save data
    if(!req.body.categoryName) {
      res.status(400);
      res.send('Not all properties are present. ' +
          'Requires categoryName.');
    } else {
      // Get the post data from the body
      var category = new Category(req.body);
      category.save(function(err) {
        if (err) {
          res.status(500).send(err);
        }
      });
      res.status(201);
      res.send(category);
    }
  };


  // Allow post and get to be accessed
  return {
    post: post,
    get: get
  };
};

module.exports = categoryController;
