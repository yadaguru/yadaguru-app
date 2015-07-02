(function(app) {

  'use strict';

  var utilService = function() {  
  
    var utils = {};

    utils.groupBy = function(arrayOfObjects, propToGroupBy) {
      var groupArray = [],
          match;
      
      var newGroup = function(initObj, groupProp) {
        var newGroupObj = {};
        newGroupObj.name = initObj[groupProp];
        newGroupObj.members = [];
        newGroupObj.members.push(initObj);
        return newGroupObj;
      };

      for (var i = 0; i < arrayOfObjects.length; i++) {
        if (arrayOfObjects[i].hasOwnProperty(propToGroupBy)) {
          if (groupArray.length === 0) {
            groupArray.push(newGroup(arrayOfObjects[i], propToGroupBy));
          } else {
            for (var j = 0; j < groupArray.length; j++) {
              match = false;
              if (groupArray[j].name === arrayOfObjects[i][propToGroupBy]) {
                groupArray[j].members.push(arrayOfObjects[i]);
                match = true;
                break;
              }
            }
            if (!match) {
              groupArray.push(newGroup(arrayOfObjects[i], propToGroupBy));
            }
          }
        }
      }
      return groupArray;
    };

    utils.parseVars = function(string, school, date) {
      var replacements = {'%SCHOOL%': school, '%DATE%': date};
      string = string.replace(/%\w+%/g, function(all) {
        return replacements[all] || all;
      });
      return string;
    };

    utils.formatDate = function(date) {
      var d = date.getDate();
      var m = date.getMonth() + 1;
      var y = date.getFullYear();
      return m + '/' + d + '/' + y;
    };
      
   return utils;
  
  };
  
  app.factory('Utils', [utilService]);

}(angular.module('yg.common.services.utils', [])));
