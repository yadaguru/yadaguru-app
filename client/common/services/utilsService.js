(function(app) {

  'use strict';

  var utilService = function() {  
  
    var utils = {};

    utils.addKeyValue = function(data, key, value, filter) {
      data = data.map(function(d) {
        if (typeof filter === 'function') {
          if (filter(d)) {
            d[key] = value;
          }
        } else {
          d[key] = value;
        }
        return d;
      });
      return data;
    };

    utils.sortBy = function(data, sortKey) {
      return data.sort(function (a, b) {
        if (a[sortKey] > b[sortKey]) {
          return 1;
        }
        if (a[sortKey] < b[sortKey]) {
          return -1;
        }
        return 0;
      });
    };
    
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

    utils.parseVars = function(string, replacementObj) {
      var replacementObjs = [];
      for (var i = 1; i < arguments.length; i++) {
        replacementObjs.push(arguments[i]);
      }
      var replacements = {};
      replacementObjs.forEach(function(replacementObj) {
        replacements[replacementObj.variable] = replacementObj.value;
      });
      string = string.replace(/%\w+%/g, function(all) {
        return replacements[all] || all;
      });
      return string;
    };

    utils.formatDate = function(dateString) {
      var date = new Date(dateString); 
      var d = date.getDate();
      var m = date.getMonth() + 1;
      var y = date.getFullYear();
      return m + '/' + d + '/' + y;
    };
      
    /**
     * Gets data from multiple models
     * @param {object} apiService - the api service object to use
     * @param {string[]} models - an array of strings of the names of the models to get
     * @param {function} callback - a function to run after all models have been retrieved, must take a data argument.
     * @param {object} data - an object to hold the data collected.
     */
    utils.getModels = function(apiService, models, callback, data) {
      //debugger;

      data = data || {};

      if (models.length === 0) {
        callback(data);
      } else {
        var model = models.pop();
        apiService[model].get().then(function(resp) {
          data[model] = resp.data;
          utils.getModels(apiService, models, callback, data);
        });
      }

    };

   return utils;
  
  };
  
                                                                                                 
  app.factory('Utils', [utilService]);

}(angular.module('yg.common.services.utils', [])));
