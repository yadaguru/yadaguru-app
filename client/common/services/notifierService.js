(function(app) {

  var notifierService = function(toastr) {
    var notifyFactory = {};

    notifyFactory.success = function(msg) {
      toastr.success(msg);
      console.log(msg);
    };

    notifyFactory.info = function(msg) {
      toastr.info(msg);
      console.log(msg);
    };

    notifyFactory.error = function(msg) {
      toastr.error(msg);
      console.log(msg);
    };

    notifyFactory.warning = function(msg) {
      toastr.warning(msg);
      console.log(msg);
    };

    return notifyFactory;
  };

  app.factory('Notifier', ['toastr', notifierService]);

}(angular.module('yg-common.services.notifier', [])));
