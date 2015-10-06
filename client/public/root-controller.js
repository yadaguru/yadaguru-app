(function(app) {
  'use strict';


  var RootController = function ($scope, YadaAPI, Utils, ReminderService, GoogleCalendar,
                                 iCalService, $timeout) {
    var ungroupedReminders = [];
    var iCal = new iCalService();
    $scope.reminders = [];
    $scope.dt = new Date();
    var calendarData;

    $scope.selectedTab = '';
    $scope.exportStatus = 'ready';

    $scope.setTab = function(tabName) {
      $scope.selectedTab = '';
      $timeout(function() {
        $scope.selectedTab = tabName;
      }, 1000);
    };

    $scope.isActiveTab = function(tabName) {
      if ($scope.selectedTab === tabName) {
        return true;
      } else {
        return false;
      }
    };

    $scope.clearReminders = function() {
      $scope.reminders = [];
      $scope.ungroupedReminders = [];
      $scope.formData.dt = null;
      $scope.formData.schoolName = null;
      $scope.exportStatus = 'ready';
    };

    $scope.downloadReminders = function() {
      ungroupedReminders.forEach(function(ur) {
        var date = new Date(ur.sortDate);
        var dateFormatted = date.getFullYear() +
                            ('0' + (date.getMonth()+1)).slice(-2) +
                            ('0' + date.getDate()).slice(-2);
        var calEvent = {
          description: ur.name || ur.testType,
          startDate: dateFormatted,
          endDate: dateFormatted,
          summary: ur.detail,
          comment: ur.message
        };
        iCal.addEvent(calEvent);
      });
      iCal.download('YadaguruReminders.ics');
      iCal.events = [];
    };

    function ParseContainer(cnt, e, p, styles) {
      var elements = [];
      var children = e.childNodes;
      if (children.length !== 0) {
          for (var i = 0; i < children.length; i++) {
            p = ParseElement(elements, children[i], p, styles);
          }
      }
      if (elements.length !== 0) {
          for (var i = 0; i < elements.length; i++) {
            cnt.push(elements[i]);
          }
      }
      return p;
    }

    function ComputeStyle(o, styles) {
      for (var i = 0; i < styles.length; i++) {
        var st = styles[i].trim().toLowerCase().split(":");
        if (st.length === 2) {
            switch (st[0]) {
                case "font-size":{
                    o.fontSize = parseInt(st[1]);
                    break;
                }
                case "text-align": {
                    switch (st[1]) {
                        case "right": o.alignment = 'right'; break;
                        case "center": o.alignment = 'center'; break;
                    }
                    break;
                }
                case "font-weight": {
                    switch (st[1]) {
                        case "bold": o.bold = true; break;
                    }
                    break;
                }
                case "text-decoration": {
                    switch (st[1]) {
                        case "underline": o.decoration = "underline"; break;
                    }
                    break;
                }
                case "font-style": {
                    switch (st[1]) {
                        case "italic": o.italics = true; break;
                    }
                    break;
                }
            }
        }
    }
  }

  function ParseElement(cnt, e, p, styles) {
      if (!styles) {
        styles = [];
      }
      if (e.getAttribute) {
          var nodeStyle = e.getAttribute("style");
          if (nodeStyle) {
              var ns = nodeStyle.split(";");
              for (var k = 0; k < ns.length; k++) {
                styles.push(ns[k]);
              }
          }
      }

      switch (e.nodeName.toLowerCase()) {
          case "#text": {
              var t = { text: e.textContent.replace(/\n/g, "") };
              if (styles) {
                ComputeStyle(t, styles);
              }
              p.text.push(t);
              break;
          }
          case "b":
          case "strong": {
              //styles.push("font-weight:bold");
              ParseContainer(cnt, e, p, styles.concat(["font-weight:bold"]));
              break;
          }
          case "u": {
              //styles.push("text-decoration:underline");
              ParseContainer(cnt, e, p, styles.concat(["text-decoration:underline"]));
              break;
          }
          case "i": {
              //styles.push("font-style:italic");
              ParseContainer(cnt, e, p, styles.concat(["font-style:italic"]));
              //styles.pop();
              break;
              //cnt.push({ text: e.innerText, bold: false });
          }
          case "span": {
              ParseContainer(cnt, e, p, styles);
              break;
          }
          case "br": {
              p = CreateParagraph();
              cnt.push(p);
              break;
          }
          case "table":
              {
                  var t = {
                      table: {
                          widths: [],
                          body: []
                      }
                  };
                  var border = e.getAttribute("border");
                  var isBorder = false;
                  if (border) {
                    if (parseInt(border) === 1) {
                      isBorder = true;
                    }
                  }
                  if (!isBorder) {
                    t.layout = 'noBorders';
                  }
                  ParseContainer(t.table.body, e, p, styles);

                  var widths = e.getAttribute("widths");
                  if (!widths) {
                      if (t.table.body.length !== 0) {
                          if (t.table.body[0].length !== 0) {
                            for (var k = 0; k < t.table.body[0].length; k++) {
                              t.table.widths.push("*");
                            }
                          }
                      }
                  } else {
                      var w = widths.split(",");
                      for (var k = 0; k < w.length; k++) {
                        t.table.widths.push(w[k]);
                      }
                  }
                  cnt.push(t);
                  break;
              }
          case "tbody": {
              ParseContainer(cnt, e, p, styles);
              //p = CreateParagraph();
              break;
          }
          case "tr": {
              var row = [];
              ParseContainer(row, e, p, styles);
              cnt.push(row);
              break;
          }
          case "td": {
              p = CreateParagraph();
              var st = {stack: []};
              st.stack.push(p);

              var rspan = e.getAttribute("rowspan");
              if (rspan) {
                st.rowSpan = parseInt(rspan);
              }
              var cspan = e.getAttribute("colspan");
              if (cspan) {
                st.colSpan = parseInt(cspan);
              }

              ParseContainer(st.stack, e, p, styles);
              cnt.push(st);
              break;
          }
          case "div":case "p": {
              p = CreateParagraph();
              var st = {stack: []};
              st.stack.push(p);
              ComputeStyle(st, styles);
              ParseContainer(st.stack, e, p);

              cnt.push(st);
              break;
          }
          default: {
              console.log("Parsing for node " + e.nodeName + " not found");
              break;
          }
      }
      return p;
  }

    function ParseHtml(cnt, htmlText) {
      htmlText = "<div>" + htmlText + "</div>";
      var html = $(htmlText.replace(/\t/g, "").replace(/\n/g, ""));
      var p = CreateParagraph();
      for (var i = 0; i < html.length; i++) {
        ParseElement(cnt, html.get(i), p);
      }
    }

    function CreateParagraph() {
      var p = {text:[]};
      return p;
    }

    $scope.saveAsPdf = function() {
      var docDefinition = {
        content: [],
        styles: {
          dateGroup: {
            fontSize: 30,
            bold: true
          },
          category: {
            fontSize: 30
          },
          reminderName: {
            fontSize: 18,
            bold: true
          },
          reminderMessage: {
            fontSize: 14
          },
          reminderDetail: {
            fontSize: 14
          }
        }
      };
      docDefinition.content.push({
        image: 'data:image/png;base64,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',
        width: 455,
        alignment: 'center'
      });
      var groupedMessages = $scope.reminders;
      for (var x = 0, gmLength = groupedMessages.length; x < gmLength; x++) {
        var dateGroup = groupedMessages[x];
        ParseHtml(docDefinition.content, dateGroup.name);
        docDefinition.content[docDefinition.content.length - 1].style = 'dateGroup';
        // docDefinition.content.push({
        //   text: ParseHtml(docDefinition.content, dateGroup.name),
        //   style: 'dateGroup'
        // });
        var categories = dateGroup.members;
        for (var y = 0, cLength = categories.length; y < cLength; y++) {
          var category = categories[y];
          ParseHtml(docDefinition.content, category.name);
          docDefinition.content[docDefinition.content.length - 1].style = 'category';
          // docDefinition.content.push({
          //   text: ParseHtml(docDefinition.content, category.name),
          //   style: 'category'
          // });
          var reminders = category.members;
          for (var z = 0, rLength = reminders.length; z < rLength; z++) {
            var reminder = reminders[z];
            ParseHtml(docDefinition.content, reminder.name);
            docDefinition.content[docDefinition.content.length - 1].style = 'reminderName';
            // docDefinition.content.push({
            //   text: ParseHtml(docDefinition.content, reminder.name),
            //   style: 'reminderName'
            // });
            ParseHtml(docDefinition.content, reminder.message);
            docDefinition.content[docDefinition.content.length - 1].style = 'reminderMessage';
            // docDefinition.content.push({
            //   text: ParseHtml(docDefinition.content, reminder.message),
            //   style: 'reminderMessage'
            // });
            ParseHtml(docDefinition.content, reminder.detail);
            docDefinition.content[docDefinition.content.length - 1].style = 'reminderDetail';
            // docDefinition.content.push({
            //   text: ParseHtml(docDefinition.content, reminder.detail),
            //   style: 'reminderDetail'
            // });
          }
        }
      }
      pdfMake.createPdf(docDefinition).download();
    };

    $scope.buildReminderList = function(data) {
      var currentDate = new Date();
      var reminderData = data.reminders,
          testDateData = data.testDates,
          categoryData = data.categories,
          settings = data.settings[0],
          summerDate = {'month': settings.summerCutoffMonth, 'day': settings.summerCutoffDay},
          testMessageData = data.testMessages[0],
          testMessageCategory = Utils.lookup(categoryData, '_id', testMessageData.testCategory, 'categoryName'),
          allData,
          reminderMessages,
          groupedMessages;
      reminderData = ReminderService.flattenTimeframes(reminderData);
      reminderData = ReminderService.generateSortDates(reminderData, 'timeframes', $scope.formData.dt, summerDate);
      var reminderDataWithCategory = [];
      reminderData = reminderData.forEach(function(reminder) {
        reminder.category = Utils.lookup(categoryData, '_id', reminder.category, 'categoryName');
        reminderDataWithCategory.push(reminder);
      });
      testDateData = ReminderService.generateSortDates(testDateData, 'registrationDate');
      testDateData = Utils.addKeyValue(testDateData, 'category', testMessageCategory);
      testDateData = Utils.addKeyValue(testDateData, 'message', testMessageData.satMessage, function(msg) {
        return msg.testType === 'SAT';
      });
      testDateData = Utils.addKeyValue(testDateData, 'detail', testMessageData.satDetail, function(msg) {
        return msg.testType === 'SAT';
      });
      testDateData = Utils.addKeyValue(testDateData, 'message', testMessageData.actMessage, function(msg) {
        return msg.testType === 'ACT';
      });
      testDateData = Utils.addKeyValue(testDateData, 'detail', testMessageData.actDetail, function(msg) {
        return msg.testType === 'ACT';
      });
      allData = reminderDataWithCategory.concat(testDateData);
      calendarData = allData;
      allData = Utils.sortBy(allData, 'sortDate');
      ungroupedReminders = allData; // Set ungroupedReminders for the iCal download
      reminderMessages = ReminderService.generateMessages(allData, $scope.formData.schoolName, $scope.formData.dt,
                                                          currentDate, testMessageCategory);
      groupedMessages = Utils.groupBy(reminderMessages, 'date');
      groupedMessages.forEach(function(dateGroup) {
        dateGroup.members = Utils.groupBy(dateGroup.members, 'category');
      });
      $scope.setTab(groupedMessages[0].name);
      $scope.reminders = groupedMessages;
    };

    $scope.getReminders = function(formData) {
      $scope.formData = formData;
      Utils.getModels(YadaAPI, ['reminders', 'testDates', 'testMessages', 'categories', 'settings'], $scope.buildReminderList);
    };


    $scope.exportToGoogleCalendar = function() {
      $scope.exportStatus = 'exporting';
      GoogleCalendar.addCalendarEvents(calendarData, $scope.formData.schoolName, $scope.formData.dt, function() {
        $scope.exportStatus = 'complete';
      });
    };

    $scope.format = 'M/d/yyyy';
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
      $scope.dt = null;
    };

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.minDate = new Date();
  };

  var FaqController = function($scope, YadaAPI, $sce) {

    $scope.faqContent = '';

    $scope.getFaqs = function() {
      YadaAPI.faqs.get().then(function(resp) {
        $scope.faqContent = $sce.trustAsHtml(resp.data[0].content);
      }, function(err) {console.log(err);});
    };

    $scope.getFaqs();

  };

  app.controller('RootController', ['$scope', 'YadaAPI', 'Utils', 'ReminderService', 'GoogleCalendar',
    'iCalService', '$timeout', RootController]);
  app.controller('FaqController', ['$scope', 'YadaAPI', '$sce', FaqController]);

}(angular.module('yg.root')));
