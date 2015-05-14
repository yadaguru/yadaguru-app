var should = require('should'),
    sinon = require('sinon');

describe('Reminder Controller Tests', function() {
  describe('Post', function() {
    it('Should not allow an empty name', function() {
      var Reminder = function(reminder) {
        this.save = function(){};
      };

      var req = {
        body: {
          name: '',
          reminder: 'test'
        }
      };

      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      };

      var reminderController = require('../controllers/reminderController')(Reminder);

      reminderController.post(req, res);
      res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
      res.send.calledWith('The fields name and reminder are required').should.equal(true);
    });
  })
})
