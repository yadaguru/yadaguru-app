define(['app'], function(app) {

  app.factory('yg.services.modal', ['$modal', '$q',
    function($modal, $q) {

      var modalFactory = {};

      modalFactory.showModal = function(content, button, template, modalClass) {

        button = button || 'ok';
        template = template || 'dist/services/generalModal.html';
        modalClass = modalClass || 'modal-general';
        content = $q.resolve(content);

        var modalInstance = $modal.open({
          templateUrl: template,
          controller: ['$scope', '$modalInstance', 'content',
            function($scope, $modalInstance, contentItem) {

              $scope.content = contentItem.data[0].content;
              $scope.buttonText = button;

              $scope.ok = function() {
                $modalInstance.close();
              };

            }],
          resolve: {
            content: function() {
              return content;
            }
          },
          windowClass: modalClass
        });

        return modalInstance.result;

      };

      return modalFactory;

    }]);

});
