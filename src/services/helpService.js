define(['app'], function(app) {

  app.factory('yg.services.help', ['$q', 'yg.services.api',
    function($q, yadaApi) {

      var helpFactory = {};

      helpFactory.getHelpMessage = function(messageName) {
        return yadaApi.contentItems.get(messageName);
      };

      return helpFactory;

  }]);

});
