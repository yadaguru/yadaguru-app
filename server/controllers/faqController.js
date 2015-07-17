var faqController = function(Faq) {

  // GET route [/api/faqs]
  var get = function(req, res) {

    Faq.find(function(err, faqs){

      // Log errors
      if(err) {
        console.log(err);
        res.status(500).send(err);
      } else {

        var returnFaqs = [];

        // Add a link for GET by id to return JSON
        faqs.forEach(function(element, index, array) {

          // Get entry as JSON object and add link
          var newFaq = element.toJSON();
          // links{} must be added before links.self can be created
          newFaq.links = {};
          newFaq.links.self = 'http://' +
            req.headers.host + '/api/faqs/' + newFaq._id;

          // Add new JSON object to return array
          returnFaqs.push(newFaq);
        });

        // Return array in JSON format
        res.json(returnFaqs);
      }
    }).sort('faq');
  };

  // POST route [/api/faqs] 
  var post = function(req, res) {

    // Return an error if there is missing data, else save data
    if(!req.body.content) {
      res.status(400);
      res.send('Not all properties are present. ' +
          'Requires content.');
    } else {
      // Get the post data from the body
      var faq = new Faq(req.body);
      faq.save(function(err) {
        if (err) {
          res.status(500).send(err);
        }
      });
      res.status(201);
      res.send(faq);
    }
  };


  // Allow post and get to be accessed
  return {
    post: post,
    get: get
  };
};

module.exports = faqController;
