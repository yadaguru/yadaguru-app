define(['app'], function(app) {

  var userService = function($resource) {
    var userFactory = {};

    userFactory.UserResource = $resource('/api/users/:id', {_id: "@id"});

    userFactory.UserResource.prototype.isAdmin = function() {
      return this.roles && this.roles.indexOf('admin') > -1;
    };

    return userFactory;
  };

  app.factory('yg.services.user', ['$resource', userService]);

});
