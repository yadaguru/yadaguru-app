define(['app'], function(app) {

  app.factory('yg.services.help', ['yg.services.api', 'yg.services.modal',
    function(yadaApi, modalService) {

      var helpFactory = {};

      helpFactory.getHelpMessage = function(messageName) {

        var contentItemResult = yadaApi.contentItems.get(messageName);
        modalService.showModal(contentItemResult, 'Got It', null, 'help-modal');

      };

      return helpFactory;

  }]);

});
