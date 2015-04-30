/**
 *  * Directive for displaying alerts
 *   * @namespace Directives
 *    */
(function (module) {
  /**
   *    * @namespace Alerts
   *       * @desc Displays alerts using the alerts template
   *          * @memberOf Directives
   *             */
  var alerts = function (alerting) {
    return {
      restrict: "AE",
      templateUrl: "../templates/alerts.html",
      link: function (scope) {
      scope.currentAlerts = alerting.currentAlerts;
      }
    };
  }
  module.directive("alerts", alerts);
}(angular.module("common")));

