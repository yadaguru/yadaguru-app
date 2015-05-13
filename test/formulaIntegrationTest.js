var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Formula = mongoose.model('Formula'),
    agent = request.agent(app);

describe('Formula CRUD Test', function () {
  it('Should allow a formula to be posted and return a _id', function(done) {
    var formulaPost = {name: 'Test', formula: '20x10+15'};
    agent.post('/api/formulas')
      .send(formulaPost)
      .expect(201)
      .end(function (err, results) {
        results.body.should.have.property('_id');
        done();
      });
  });
  afterEach(function (done) {
    Formula.remove().exec();
    done();
  });
});
