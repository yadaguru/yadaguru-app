(function(app) {

  'use strict';

  var utilService = function() {  
  
    var utils = {};

    /**
     * Adds key/value pairs to an array of objects, with an optional filter
     * Returns an array of objects
     * @param {object[]} data - an array of data objects to be modified
     * @param {string} key - the name of the key to be added
     * @param {string} value - the value of the key to be added
     * @param {function} filter - a function to use for filtering. Function must take
     *                            one parameter to represent the data object being filtered.
     *                            Function must evaluate to true or false.
     */
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

    /**
     * Sorts an array of objects
     * Returns an array of objects
     * @param {object[]} data = an array of objects
     * @param {string} sortKey - the key on which to sort
     */
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
    
    /**
     * Groups an array of objects into into a two-dimensional grouped array
     * Returns a two-dimension array of objects.
     * @param {object[]} - an array of objects
     * @param {string} propToGroupBy - the property to group the object by
     */
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

    /**
     * Parses text, replacing  %VARIABLE% placeholders with values.
     * Returns a string.
     * @param {string} - Text to be parsed
     * @param {object...} - One or more objects containing the variable and the value
     *   @property {variable} - The variable to be replaced
     *   @property {value} - The value of the variable
     */
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

    /**
     * Formats a date in M/D/YYYY format.
     * Returns a string.
     * @param {string} dateString - a string representing a valid date
     */
    utils.formatDate = function(dateString) {
      var date = new Date(dateString); 
      var d = date.getDate();
      var m = date.getMonth() + 1;
      var y = date.getFullYear();
      return m + '/' + d + '/' + y;
    };
      
   return utils;
  
  };
  
  app.factory('Utils', [utilService]);

}(angular.module('yg.common.services.utils', [])));
