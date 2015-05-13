var should = require('should'),
    sinon = require('sinon');

describe('Formula Controller Tests', function() {
  describe('Post', function() {
    it('Should not allow an empty name', function() {
      var Formula = function(formula) {
        this.save = function(){};
      };

      var req = {
        body: {
          name: '',
          formula: 'test'
        }
      };

      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      };

      var formulaController = require('../controllers/formulaController')(Formula);

      formulaController.post(req, res);
      res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
      res.send.calledWith('The fields name and formula are required').should.equal(true);
    });
  })
})
