var should = require('should'),
    sinon = require('sinon');

describe('Reminder Controller Tests', function() {
  describe('Post', function() {
    it('Should allow post with all data present');
    it('Should not allow an empty property', function() {
      var Reminder = function(reminder) {
        this.save = function(){};
      };

      var req = {
        body: {
        }
      };

      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      };

      var reminderController = require('../controllers/reminderController')(Reminder);

      reminderController.post(req, res);
      res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
      res.send.calledWith('Not all properties are present. ' +
          'Requires field, fullName, message, detail, and reminder.').should.equal(true);
    });
  })
  
  describe('Get', function() {
    it('Should return an array of data');
  })
})
