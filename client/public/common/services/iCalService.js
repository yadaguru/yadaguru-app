(function(app) {

  'use strict';

  var iCalService = function(SaveAs) {
    var iCalFactory = function() {
      // Ideally if the browser is MSIE < 10 the iCal save button shouldn't be shown
      if (navigator.userAgent.indexOf('MSIE') > -1 &&
          navigator.userAgent.indexOf('MSIE 10') === -1) {
        console.log('Unsupported Browser');
        return;
      }
      this.SEPARATOR = (navigator.appVersion.indexOf('Win') !== -1) ? '\r\n' : '\n';
      this.BEGIN = ['BEGIN:VCALENDAR', 'VERSION:2.0'].join(this.SEPARATOR);
      this.END = 'END:VCALENDAR';
      this.events = [];
    };


    iCalFactory.prototype.addEvent = function(calEvent) {
      if (calEvent.startDate && calEvent.endDate && calEvent.summary &&
          calEvent.description && calEvent.comment) {
        this.events.push([
          'BEGIN:VEVENT',
          'CLASS:PUBLIC',
          'DESCRIPTION:' + calEvent.description,
          'DTSTART;VALUE=DATE:' + calEvent.startDate,
          'DTEND;VALUE=DATE:' + calEvent.endDate,
          'SUMMARY;LANGUAGE=en-us:' + calEvent.summary,
          'COMMENT:' + calEvent.comment,
          'END:VEVENT'
        ].join(this.SEPARATOR));
      } else {
        console.log('Error: bad event data');
        console.log(calEvent);
      }
    };

    iCalFactory.prototype.getCal = function() {
      return [this.BEGIN,
              this.events.join(this.SEPARATOR),
              this.END].join(this.SEPARATOR);
    };

    iCalFactory.prototype.download = function (filename) {
      var blob = new Blob([this.getCal()]);
      SaveAs.download(blob, filename);
    };

    return iCalFactory;
  };

  app.factory('iCalService', ['SaveAs', iCalService]);

}(angular.module('yg.common.services.iCal', [])));
