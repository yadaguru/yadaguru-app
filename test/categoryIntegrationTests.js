var app      = require('../server/server.js'),
    mongoose = require('mongoose'),
    Category = mongoose.model('Category'),
    should   = require('should'),
    request  = require('supertest'),
    agent    = request.agent(app);

// var login = function(done){
//   var loginPost = { username: 'yada', password: 'guru' };
//   agent.post('/api/auth/login')
//        .send(loginPost)
//        .expect(200)
//        .end(function(err, results) {
//          console.log(results.text);
//          if(err) {
//            throw err;
//          }
//          results.text.success.should.equal(true);
//          results.text.should.have.property('user');
//          done();
//        });
// };

describe('Category CRUD Tests', function () {
  describe('POST', function () {
    // Not working right now, need to come up with a different method of handling session
    // it('should allow a authorized session with valid categoryName', function(done) {
    //
    //   var categoryName = 'Some category';
    //   var categoryPost = { categoryName: categoryName };
    //
    //   login(function(done){
    //     agent.post('/api/categories')
    //          .send(categoryPost)
    //          .expect(201)
    //          .end(function(err, results) {
    //            if (err) {
    //              throw err;
    //            }
    //            done();
    //          });
    //   });
    // });
    it('should not allow a post without authorization', function (done) {
      var categoryPost = { categoryName: 'I am not authorized' };

      agent.post('/api/categories')
           .send(categoryPost)
           .expect(403)
           .end(function(err, results) {
             if (err) {
               throw err;
             }
             done();
           });
    });
  });
  afterEach(function(done) {
    Category.remove().exec();
    done();
  });
});
