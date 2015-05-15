var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Reminder = mongoose.model('Reminder'),
    agent = request.agent(app);

describe('Reminder Route by ID Test', function () {
  describe('Routes should allow:', function () {
    it('GET by ID and return record');
    it('GET by invalid ID and return 404');
    it('PUT by ID and return record');
    it('PUT by invalid ID and return 404');
    it('PATCH by ID and return record');
    it('PATCH by invalid ID and return 404');
    it('DELETE by ID and return 201');
    it('DELETE by invalid ID and return 404');
  });
});
