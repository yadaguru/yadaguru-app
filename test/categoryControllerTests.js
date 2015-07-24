var should = require('should'),
    sinon  = require('sinon');

var postMock = function(categoryName) {
  // Mock category object
  var Category = function(category){ this.save = function(){} };

  var req = {
    body: {
      categoryName: categoryName
    }
  }

  var res = {
    status: sinon.spy(),
    send: sinon.spy()
  }

  var categoryController = require('../server/controllers/categoryController')(Category);
  categoryController.post(req, res);
  return res;
}

describe('Category Controller Tests:', function() {
  describe('POST', function () {
    it('should allow a valid categoryName', function () {
      var res = postMock('some name');
      res.status.calledWith(201).should.equal(true, 'Bad Status ' +
                                              res.status.args[0][0]);
    });
    it('should not allow an empty categoryName', function () {
      var res = postMock('');
      res.status.calledWith(400).should.equal(true, 'Bad Status ' +
                                              res.status.args[0][0]);
      res.send.calledWith('Not all properties are present. ' +
          'Requires categoryName.').should.equal(true);
    });
  });
});
