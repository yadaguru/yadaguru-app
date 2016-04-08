'use strict';

var response = {};

/**
 * Returns a standard success handler function.
 *
 * @param    {Object}    res       The express router response object.
 * @param    {Object}    [format]  key/value pairs mapping db data to response data.
 * @returns  {Function}  The success handler function.
 */
response.getSuccessHandler = function(res, format) {

  return function(data) {
    res.status(200);
    if (typeof format !== 'undefined') {
      res.send(response._formatResponse(data, format));
    } else {
      res.send(data);
    }
  }

};

/**
 * Returns a standard error handler function.
 *
 * @param    {Object}    res       The express router response object.
 * @param    {Object}    [format]  key/value pairs mapping db data to response data.
 * @returns  {Function}  The error handler function.
 */
response.getErrorHandler = function(res, format) {

  return function(error) {
    if (error.name === "SequelizeValidationError") {
      res.status(400);
    } else {
      res.status(500);
    }
    if (typeof format !== 'undefined') {
      res.send(response._formatResponse(error, format));
    } else {
      res.send(error);
    }
  }

};

/**
 * Formats an HTTP response by mapping supplied keys to response data.
 *
 * @param    {Object[]}  data       The response data
 * @param    {Object}    mapperObj  Key/value pairs for mapping db data to response data.
 * @returns  {Array}
 * @private
 */
response._formatResponse = function(data, mapperObj) {

  var formattedResponse = [];
  var mappedKeys = Object.keys(mapperObj);

  data.forEach(function(el) {
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

module.exports = response;