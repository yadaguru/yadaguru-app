var reminderController = function(Reminder) {

  // GET route [/api/reminders]
  var get = function(req, res) {

    Reminder.find(function(err, reminders){

      // Log errors
      if(err) {
        console.log(err);
        res.status(500).send(err);
      } else {

        var returnReminders = [];

        // Add a link for GET by id to return JSON
        reminders.forEach(function(element, index, array) {

          // Get entry as JSON object and add link
          var newReminder = element.toJSON();
          // links{} must be added before links.self can be created
          newReminder.links = {};
          newReminder.links.self = 'http://' +
            req.headers.host + '/api/reminders/' + newReminder._id;

          // Add new JSON object to return array
          returnReminders.push(newReminder);
        });

        // Return array in JSON format
        res.json(returnReminders);
      }
    });
  };

  // POST route [/api/reminders] 
  var post = function(req, res) {

    // Return an error if there is missing data, else save data
    if(!req.body.name || 
       !req.body.message ||
       !req.body.detail ||
       !req.body.lateMessage ||
       !req.body.lateDetail ||
       !req.body.category ||
       !req.body.timeframe) {
      res.status(400);
      res.send('Not all properties are present. ' +
          'Requires name, message, detail, lateMessage, lateDetail, and timeframe.');
    } else {
      // Get the post data from the body
      var reminder = new Reminder(req.body);
      reminder.save(function(err) {
        if (err) {
          res.status(500).send(err);
        }
      });
      res.status(201);
      res.send(reminder);
    }
  };


  // Allow post and get to be accessed
  return {
    post: post,
    get: get
  };
};

module.exports = reminderController;
