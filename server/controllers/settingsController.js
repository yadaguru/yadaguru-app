var settingsController = function(Settings) {

  // GET route [/api/settings]
  var get = function(req, res) {

    Settings.find(function(err, settings){

      // Log errors
      if(err) {
        console.log(err);
        res.status(500).send(err);
      } else {

        var returnSettings = [];

        // Add a link for GET by id to return JSON
        settings.forEach(function(element, index, array) {

          // Get entry as JSON object and add link
          var newSettings = element.toJSON();
          // links{} must be added before links.self can be created
          newSettings.links = {};
          newSettings.links.self = 'http://' +
            req.headers.host + '/api/settings/' + newSettings._id;

          // Add new JSON object to return array
          returnSettings.push(newSettings);
        });

        // Return array in JSON format
        res.json(returnSettings);
      }
    }).sort('settings');
  };

  // POST route [/api/settings] 
  var post = function(req, res) {

    // Return an error if there is missing data, else save data
    if(!req.body.content) {
      res.status(400);
      res.send('Not all properties are present. ' +
          'Requires summerCutoffDate.');
    } else {
      // Get the post data from the body
      var settings = new Settings(req.body);
      settings.save(function(err) {
        if (err) {
          res.status(500).send(err);
        }
      });
      res.status(201);
      res.send(settings);
    }
  };


  // Allow post and get to be accessed
  return {
    post: post,
    get: get
  };
};

module.exports = settingsController;
