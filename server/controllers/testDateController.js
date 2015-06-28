var testDateController = function(TestDate) {

  // GET route [/api/test-dates]
  var get = function(req, res) {

    TestDate.find(function(err, testDates){

      // Log errors
      if(err) {
        console.log(err);
        res.status(500).send(err);
      } else {

        var returnTestDates = [];

        // Add a link for GET by id to return JSON
        testDates.forEach(function(element, index, array) {

          // Get entry as JSON object and add link
          var newTestDate = element.toJSON();
          // links{} must be added before links.self can be created
          newTestDate.links = {};
          newTestDate.links.self = 'http://' +
            req.headers.host + '/api/test-dates/' + newTestDate._id;

          // Add new JSON object to return array
          returnTestDates.push(newTestDate);
        });

        // Return array in JSON format
        res.json(returnTestDates);
      }
    }).sort('testDate');
  };

  // POST route [/api/test-dates] 
  var post = function(req, res) {

    // Return an error if there is missing data, else save data
    if(!req.body.testDate || 
       !req.body.registrationDate ||
       !req.body.testType) {
      res.status(400);
      res.send('Not all properties are present. ' +
          'Requires testDate, registrationDate,  and testType.');
    } else {
      // Get the post data from the body
      var testDate = new TestDate(req.body);
      testDate.save(function(err) {
        if (err) {
          res.status(500).send(err);
        }
      });
      res.status(201);
      res.send(testDate);
    }
  };


  // Allow post and get to be accessed
  return {
    post: post,
    get: get
  };
};

module.exports = testDateController;
