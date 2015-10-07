(function(app) {

  'use strict';

  var googleCalendarService = function(Utils, $rootScope) {

    var CLIENT_ID = '240339457257-tqhtiqq9irs42ite1tmp1gjii23hg3uo.apps.googleusercontent.com';
    var SCOPES = ['https://www.googleapis.com/auth/calendar'];
    var calendarId;

    function _parseAllVars(message, event, school, dueDate) {

      var replaceVar = function(string, variable, value) {
        var re = new RegExp(variable, 'g');
        return string.replace(re, value);
      };

      message = event.registrationDate ? replaceVar(message, '%REGDATE%', Utils.formatDate(event.registrationDate)) : message;
      message = event.testDate ? replaceVar(message, '%TESTDATE%', Utils.formatDate(event.testDate)) : message;
      message = school ? replaceVar(message, '%SCHOOL%', school) : message;
      message = dueDate ? replaceVar(message, '%DATE%', Utils.formatDate(dueDate)) : message;

      return message;
    }

    function _stripHTML(html) {
      var tmp = document.createElement('DIV');
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || '';
    }

    function _formatDate(dateTime) {
      var date = new Date(dateTime);
      var today = new Date();
      if (date < today) {
        date = today;
      }
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      return year + '-' + month + '-' + day;
    }

    function addCalendarEvents(events, school, dueDate, callback) {
      // authorizes YadaGuru with user's Google account
      gapi.auth.authorize({
        'client_id': CLIENT_ID,
        'scope': SCOPES,
        'immediate': false
      }, function(resp) {
        // loads calendar API
        gapi.client.load('calendar', 'v3', function() {

          // creates YadaGuru Reminders calendar
          var createCalendarRequest = gapi.client.calendar.calendars.insert({
            summary: 'YadaGuru Reminders'
          });

          createCalendarRequest.execute(function(resp) {
            calendarId = resp.id;

            // adds all reminders to newly created Google Calendar
            var batch = gapi.client.newBatch();
            for (var i = 0; i < events.length; i++) {
              var event = events[i];
              var date = _formatDate(event.sortDate);
              batch.add(gapi.client.calendar.events.insert({
                calendarId: calendarId,
                resource: {
                  start: {
                    date: date
                  },
                  end: {
                    date: date
                  },
                  summary: event.name || event.category,
                  description: _parseAllVars(event.message, event, school, dueDate) + '\n' +
                    _stripHTML(_parseAllVars(event.detail, event, school, dueDate))
                }
              }));
            }
            batch.execute(function(resp) {
              console.log('complete');
              $rootScope.$apply(function() {
                callback(resp);
              })
            });
          });
        });
      });
    }

    return {
      addCalendarEvents: addCalendarEvents,
    };
  };

  app.factory('GoogleCalendar', ['Utils', '$rootScope', googleCalendarService]);

}(angular.module('yg.common.services.google-calendar', [])));
