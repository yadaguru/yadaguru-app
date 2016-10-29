define(['app'], function(app) {

  app.factory('yg.services.help', ['yg.services.api', 'yg.services.modal',
    function(yadaApi, modalService) {

      var helpFactory = {};

      helpFactory.getHelpMessage = function(messageName) {

        var contentItemResult = yadaApi.getOne('content_items', messageName, false);
        modalService.showModal(contentItemResult, {button: 'Got It', modalClass: 'help-modal'});
      };

      return helpFactory;

  }]);

});
