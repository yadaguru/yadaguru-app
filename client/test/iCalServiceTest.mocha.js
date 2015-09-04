'use strict';

describe('iCal Service', function() {
  var iCalService;

  beforeEach(module('yg.common.services.iCal'));

  beforeEach(inject(function (_iCalService_) {
    iCalService = _iCalService_;
  }));

  describe('adding event to list should', function () {
    var ical;
    beforeEach(function() {
      ical = new iCalService();
    });

    it('accept a valid event', function () {
      var SEPARATOR = (navigator.appVersion.indexOf('Win') !== -1) ? '\r\n' : '\n';
      var validEvent = {
        startDate: 20151230,
        endDate: 20151230,
        summary: 'summary',
        description: 'description',
        comment: 'comment'
      };
      var expected = [
        'BEGIN:VEVENT',
        'CLASS:PUBLIC',
        'DESCRIPTION' + validEvent.description,
        'DTSTART;VALUE=DATE:' + validEvent.startDate,
        'DTEND;VALUE=DATE:' + validEvent.endDate,
        'SUMMARY;LANGUAGE=en-us:' + validEvent.summary,
        'COMMENT:' + validEvent.comment,
        'END:VEVENT'].join(SEPARATOR);

      ical.addEvent(validEvent);

      expect(ical.events).to.include(expected);
    });

    it('reject an event without a start date', function() {
      var invalidEvent = {
        endDate: 20151230,
        summary: 'summary',
        description: 'description',
        comment: 'comment'
      };

      ical.addEvent(invalidEvent);

      expect(ical.events).to.not.include(invalidEvent);
    });

    it('reject an event without a end date', function() {
      var invalidEvent = {
        startDate: 20151230,
        summary: 'summary',
        description: 'description',
        comment: 'comment'
      };

      ical.addEvent(invalidEvent);

      expect(ical.events).to.not.include(invalidEvent);
    });

    it('reject an event without a summary', function() {
      var invalidEvent = {
        startDate: 20151230,
        endDate: 20151230,
        description: 'description',
        comment: 'comment'
      };

      ical.addEvent(invalidEvent);

      expect(ical.events).to.not.include(invalidEvent);
    });

    it('reject an event without a description', function() {
      var invalidEvent = {
        startDate: 20151230,
        endDate: 20151230,
        summary: 'summary',
        comment: 'comment'
      };

      ical.addEvent(invalidEvent);

      expect(ical.events).to.not.include(invalidEvent);
    });

    it('reject an event without a comment', function() {
      var invalidEvent = {
        startDate: 20151230,
        endDate: 20151230,
        summary: 'summary',
        description: 'description',
      };

      ical.addEvent(invalidEvent);

      expect(ical.events).to.not.include(invalidEvent);
    });
  });

  describe('requesting a calendar should', function () {
    var ical;
    beforeEach(function() {
      ical = new iCalService();
    });

    it('return a valid calendar', function () {
      var SEPARATOR = (navigator.appVersion.indexOf('Win') !== -1) ? '\r\n' : '\n';
      var validEvent = {
        startDate: 20151230,
        endDate: 20151230,
        summary: 'summary',
        description: 'description',
        comment: 'comment'
      };
      var expected = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        'CLASS:PUBLIC',
        'DESCRIPTION' + validEvent.description,
        'DTSTART;VALUE=DATE:' + validEvent.startDate,
        'DTEND;VALUE=DATE:' + validEvent.endDate,
        'SUMMARY;LANGUAGE=en-us:' + validEvent.summary,
        'COMMENT:' + validEvent.comment,
        'END:VEVENT',
        'END:VCALENDAR'].join(SEPARATOR);

      ical.addEvent(validEvent);

      expect(ical.getCal()).to.equal(expected);
    });
  });

});
