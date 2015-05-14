var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Reminder = mongoose.model('Reminder'),
    agent = request.agent(app);

describe('Reminder CRUD Test', function () {
  it('Should allow a reminder to be posted and return a _id', function(done) {
    var reminderPost = {name: 'Test', reminder: '20x10+15'};
    agent.post('/api/reminders')
      .send(reminderPost)
      .expect(201)
      .end(function (err, results) {
        results.body.should.have.property('_id');
        done();
      });
  });
  afterEach(function (done) {
    Reminder.remove().exec();
    done();
  });
});
