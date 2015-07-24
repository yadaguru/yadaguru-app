var app      = require('../server/server.js'),
    mongoose = require('mongoose'),
    Category = mongoose.model('Category'),
    should   = require('should'),
    request  = require('supertest'),
    agent    = request.agent(app);

var login = function(){
  var loginPost = { username: 'yada', password: 'guru' };
  agent.post('/api/auth/login')
       .send(loginPost)
       .expect(200)
       .end(function(err, results) {
         results.text.success.should.equal(true);
         results.text.should.have.property('user');
         done();
       });
};

describe('Category CRUD Tests', function () {
  describe('POST', function () {
    it('should allow a authorized session with valid categoryName', function(done) {
      login();
      var categoryName = 'Some category';
      var categoryPost = { categoryName: categoryName };

      agent.post('/api/categories')
                 .send(categoryPost)
                 .expect(201)
                 .end(function(err, results) {
                   done();
                 });
    });
    it('should not allow a post without authorization', function (done) {
      var categoryPost = { categoryName: 'I am not authorized' };

      agent.post('/api/categories')
           .send(categoryPost)
           .expect(403)
           .end(function() {
             done();
           });
    });
  });
  afterEach(function(done) {
    Category.remove().exec();
    done();
  });
});
