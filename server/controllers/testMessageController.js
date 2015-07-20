var testMessageController = function(TestMessage) {

  // GET route [/api/test-messages]
  var get = function(req, res) {

    TestMessage.find(function(err, testMessages){

      // Log errors
      if(err) {
        console.log(err);
        res.status(500).send(err);
      } else {

        var returnTestMessages = [];

        // Add a link for GET by id to return JSON
        testMessages.forEach(function(element, index, array) {

          // Get entry as JSON object and add link
          var newTestMessage = element.toJSON();
          // links{} must be added before links.self can be created
          newTestMessage.links = {};
          newTestMessage.links.self = 'http://' +
            req.headers.host + '/api/test-messages/' + newTestMessage._id;

          // Add new JSON object to return array
          returnTestMessages.push(newTestMessage);
        });

        // Return array in JSON format
        res.json(returnTestMessages);
      }
    }).sort('testMessage');
  };

  // POST route [/api/test-messages] 
  var post = function(req, res) {

    // Return an error if there is missing data, else save data
    if(!req.body.satMessage || 
       !req.body.satDetail ||
       !req.body.actMessage ||
       !req.body.actDetail) {
      res.status(400);
      res.send('Not all properties are present. ' +
          'Requires satMessage, satDetail, actMessage,  and actDetail.');
    } else {
      // Get the post data from the body
      var testMessage = new TestMessage(req.body);
      testMessage.save(function(err) {
        if (err) {
          res.status(500).send(err);
        }
      });
      res.status(201);
      res.send(testMessage);
    }
  };


  // Allow post and get to be accessed
  return {
    post: post,
    get: get
  };
};

module.exports = testMessageController;
