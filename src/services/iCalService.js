define(['app'], function(app) {

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

    function _stripHTML(html) {
      var tmp = document.createElement('DIV');
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || '';
    }

    iCalFactory.prototype.addEvent = function(calEvent) {
      if (calEvent.startDate && calEvent.endDate && calEvent.summary &&
          calEvent.description && calEvent.comment) {
        this.events.push([
          'BEGIN:VEVENT',
          'CLASS:PUBLIC',
          'DESCRIPTION:' + _stripHTML(calEvent.description),
          'DTSTART;VALUE=DATE:' + calEvent.startDate,
          'DTEND;VALUE=DATE:' + calEvent.endDate,
          'SUMMARY;LANGUAGE=en-us:' + _stripHTML(calEvent.summary),
          'COMMENT:' + _stripHTML(calEvent.comment),
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

  app.factory('yg.services.iCal', ['SaveAs', iCalService]);

});
