define(['app'], function(app) {

  app.factory('yg.services.help', ['$q', 'yg.services.api', '$modal',
    function($q, yadaApi, $modal) {

      var helpFactory = {};

      helpFactory.getHelpMessage = function(messageName) {

        $modal.open({
          templateUrl: 'dist/services/helpModal.html',
          controller: ['$scope', '$modalInstance', 'contentItem',
            function($scope, $modalInstance, contentItem) {

              $scope.content = contentItem.data[0].content;
              $scope.modalClass = contentItem.data[0].name;

              $scope.ok = function() {
                $modalInstance.close();
              };

              $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
              };

            }],
          resolve: {
            contentItem: function() {
              return yadaApi.contentItems.get(messageName);
            }
          },
          windowClass: 'help-modal modal-' + messageName
        });

      };

      return helpFactory;

  }]);

});
