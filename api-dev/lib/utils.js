

var utils = {};

/**
 * Formats an array of objects according to a mapper object
 *
 * @param {Object[]} resp
 * @param {Object} mapperObj
 * @returns {Array}
 */
utils.formatResponse = function(resp, mapperObj) {

  var formattedResponse = [];
  var mappedKeys = Object.keys(mapperObj);

  resp.forEach(function(el) {
    var formattedEl = {};
    mappedKeys.forEach(function(key) {
      if (typeof mapperObj[key] === 'object' && mapperObj[key] !== null) {
        formattedEl[key] = el[mapperObj[key].value].map(mapperObj[key].mapper);
      } else {
        formattedEl[key] = el[mapperObj[key]];
      }
    });
    formattedResponse.push(formattedEl);
  });

  return formattedResponse;
};

module.exports = utils;