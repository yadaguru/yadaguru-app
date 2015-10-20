define(['app'], function(app) {

  'use strict';

  var linebreaks = function() {
    return function(data) {
      if (!data) {
        return data;
      }
        return data.replace(/\n\r?/g, '<br/>');
    };
  };

  app.filter('linebreaks', linebreaks);

});
