define(['app'], function(app) {

  /**
   * A service for displaying modals in a consistent manner across the app.
   */
  app.factory('yg.services.modal', ['$modal', '$q',
    function($modal, $q) {

      var modalFactory = {};

      /**
       * Shows a modal, with specified content and options.
       *
       * @param {promise} content - A promise that contains the content, ideally the result of an $http request. To create custom content, use modalFactory.makeModalMessage.
       * @param {object} options - An options object (see keys below)
       * @param {string} options.button - The OK button text (default: 'ok')
       * @param {function} options.buttonCallback - Callback to run when clicking 'ok'. Passed the
       *   $modalInstance.
       * @param {string} options.cancel - The cancel button text (default: no cancel button)
       * @param {function} options.cancelCallback - Callback to run when clicking 'cancel'. Pass the
       *   #modalInstance.
       * @param {string} options.template - The template used to display the modal (default: 'dist/services/generalModal.html')
       * @param {function} options.controller - The controller to use (see source for default controller).
       * @param {array} options.deps - The controller's dependencies (default, '$scope', '$modalInstance', contentItem).
       * @returns {promise} - The promise object at $modalInstance.result;
       */
      modalFactory.showModal = function(content, options) {

        options = options || {};

        var defaultController = function($scope, $modalInstance, contentItem) {
          $scope.content = contentItem.data[0].content;
          $scope.buttonText = button;

          $scope.ok = function() {
            if (typeof options.buttonCallback === 'function') {
              return options.buttonCallback($modalInstance);
            }

            return $modalInstance.close();
          };

          if (options.cancel) {
            $scope.cancel = function() {
              if (typeof options.cancelCallback === 'function') {
                return options.cancelCallback($modalInstance);
              }

              return $modalInstance.dismiss('cancel');
            };
            $scope.cancelText = options.cancel;
          }
        };
        var defaultDepsController = ['$scope', '$modalInstance', 'contentItem', defaultController];

        var button = options.button || 'ok';
        var template = options.template || 'dist/services/generalModal.html';
        var modalClass = options.modalClass || 'modal-general';
        var depsAndController;

        if (options.controller && options.deps) {
          depsAndController = options.deps.push(options.controller);
        } else {
          depsAndController = defaultDepsController;
        }

        var modalInstance = $modal.open({
          templateUrl: template,
          controller: depsAndController,
          resolve: {
            contentItem: function() {
              return content;
            }
          },
          windowClass: modalClass
        });

        return modalInstance.result;

      };

      /**
       * Makes a new modal message wrapped in a promise.
       *
       * @param    {string...}  message  Text to of the message.
       * @returns  {promise}    Promise to be passed into modalFactory.showModal().
       */
      modalFactory.makeModalMessage = function(message) {
        var content = '';
        if (arguments.length > 1) {
          for (var i = 0; i < arguments.length; i++) {
            content += arguments[i];
          }
        } else {
          content = message;
        }
        return $q.resolve({data: [{content: content}]});
      };

      return modalFactory;

    }]);

});
