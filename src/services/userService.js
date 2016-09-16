define(['app'], function(app) {

  var userService = function($resource, $cookies) {
    var userFactory = {};

    userFactory.UserResource = $resource('/api/users/:id', {_id: "@id"});

    userFactory.UserResource.prototype.isAdmin = function() {
      return this.roles && this.roles.indexOf('admin') > -1;
    };

    userFactory.currentUserId = false;

    // TODO Remove/refactor later. Temporary method of getting user id cookie.
    userFactory.getCurrentUserId =  function() {
      return userFactory.currentUserId ? userFactory.currentUserId : $cookies.get('yg-uid');
    };

    // TODO Remove/refactor later. Temporary method of setting user id cookie.
    userFactory.setCurrentUserId = function(uid) {
      userFactory.currentUserId = uid;
      $cookies.put('yg-uid', uid);
    };

    return userFactory;
  };

  app.factory('yg.services.user', ['$resource', '$cookies', userService]);

});
