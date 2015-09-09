(function(app) {
  'use strict';

  var RootController = function ($scope, YadaAPI, Utils, ReminderService, iCalService) {
    var ungroupedReminders = [];
    var iCal = new iCalService();
    $scope.reminders = [];
    $scope.dt = new Date();

    $scope.selectedTab = '';

    $scope.setTab = function(tabName) {
      $scope.selectedTab = tabName;
    };

    $scope.isActiveTab = function(tabName) {
      if ($scope.selectedTab === tabName) {
        return true;
      } else {
        return false;
      }
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
      iCal.download('test.ics');
      iCal.events = [];
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
      allData = Utils.sortBy(allData, 'sortDate');
      ungroupedReminders = allData; // Set ungroupedReminders for the iCal download
      console.log(ungroupedReminders);
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

  app.controller('RootController', ['$scope', 'YadaAPI', 'Utils', 'ReminderService', 'iCalService', RootController]);
  app.controller('FaqController', ['$scope', 'YadaAPI', '$sce', FaqController]);

}(angular.module('yg.root')));
