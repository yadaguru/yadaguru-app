(function() {

  'use strict';

  angular.module('yadaApp.services.utils', []).factory('Utils', function() {
    
    var utils = {};

    utils.groupBy = function(arrayOfObjects, propToGroupBy) {
      var groupArray = [],
          match;
      
      var newGroup = function(initObj, groupProp) {
        var newGroupObj = {};
        newGroupObj.group = initObj[groupProp];
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
              if (groupArray[j].group === arrayOfObjects[i][propToGroupBy]) {
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

   return utils;
  
  });
  
}());
