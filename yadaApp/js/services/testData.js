(function() {

  'use strict';

  angular.module('yadaApp.services.testData', [])
    .factory('TestData', function() {
      
      var Reminder = function(_id, field, fullName, message, detail, reminder) {
        this._id = _id || 0;
        this.field = field || '';
        this.fullName = fullName || '';
        this.message = message || '';
        this.detail = detail || '';
        this.reminder = reminder || 0;
      };

      var reminders = [];

      reminders.push(new Reminder(1,'StartOnlineApp','Application Start Date','Start %SCHOOL%\'s application %DATE%','This is the date you should log into the online application system for this school and create a user, fill in your basic information and get your application started.',90));
      reminders.push(new Reminder(17,'SATRegistrationDate','SAT Registration Date','Register for the SAT by %DATE%','The SAT can cause a lot of stress. Minimize your stress levels by taking the SAT early. That way if you need to take it again, you\'ll have time.',90));
      reminders.push(new Reminder(18,'LatestSAT','Latest SAT Registration Date','You should register for the SAT at the latest, by %DATE%','The schools need time to receive your SAT scores. If you register any later than %LatestSAT% there\'s a large chance that your schools won\'t get your scores by the submission date',90));
      reminders.push(new Reminder(19,'ACTRegistration','ACT Registration Date','Register for the ACT by %DATE%','The ACT can cause a lot of stress. Minimize your stress levels by taking the ACTsearly. That way if you need to take it again, you\'ll have time.',90));
      reminders.push(new Reminder(20,'LatestACT','Latest ACT Registration Date','You should register for the SAT at the latest, by %DATE%','The schools need time to receive your ACT scores. If you register any later than %LatestACT% there\'s a large chance that your schools won\'t get your scores by the submission date',90));
      reminders.push(new Reminder(8,'DownloadSchoolForm','Download School Forms','Download the blank school forms and give them to your counselor by %DATE%. If you\'re using an online application, encourage your counselor to login by this date.','Either print the recommendation form from online apps or give your recommenders directions on how to get into the online app so they can start your recommendation.',60));
      reminders.push(new Reminder(3,'DownloadRecForms','Download Recommendation Forms','Download the blank receommendation forms and give them to your recommenders by %DATE%. If you\'re using an online application, encourage your recommender to login by this date.','Either print the recommendation form from online apps or give your recommenders directions on how to get into the online app so they can start your recommendation.',60));
      reminders.push(new Reminder(7,'NotifyCounselor','Notify Counselor','Ask your high school counselorsto fill out a transcript and recommendation form.','This is a good safe date to let your counselors know that ',60));
      reminders.push(new Reminder(2,'NotifyRecommenders','Notify Recommenders ','Figure out who can be your recommender and ask them by %DATE%','Generally you want to figure out who will recommend you and notify them as early as possible. Check the application to see how many recommenders you\'ll need.',60));
      reminders.push(new Reminder(12,'StartEssays','Start Essays','You should start writing your essays on %DATE%','Start your essays early. Read and re-read what\'s required and start to think about how you will answer the essays. Be careful to note the number of essays required.',60));
      reminders.push(new Reminder(15,'StartPortfolio','Start your Portfolio','If you are creating a portfolio, you should start your portfolio on %DATE%','Give yourself plenty of time to assemble your portfolio. Start early, get advice about your best work from others, and maybe create a few more. By thinking about this early, you\'ll have time to present your best works. This would also be a good time to check the schools website and find out how the school wants you to submit your works. Usually it\'s through an online portal. So get familer with this link and how to upload to it.',60));
      reminders.push(new Reminder(9,'RemindCounselor','Remind Counselor','Check in with your counselor by %DATE% and remind them to submit your school forms.','Counselors are usually very busy humans. Your gentle and kind reminder will help them get their school forms in on time.',30));
      reminders.push(new Reminder(4,'RemindRecs','Remind Recommenders','Check in with your recommenders by %DATE% and remind them to submit your recommendation.','Recommenders are usually very busy humans. Your gentle and kind reminder will help them get their recommendation in on time.',30));
      reminders.push(new Reminder(13,'SubmitSnailEssays','Submit Snail Essays','If you are sending your essays via regular mail you should send them by %DATE%','Things happen. Mail gets lost or misplaced. So you want to mail your essays very early to allow time for things to go wrong, just in case you need to mail again.',30));
      reminders.push(new Reminder(16,'SubmitPortfolio','Submit your Portfolio','If you have a portfolio, Submit it by %DATE%','Your portfolio will probably need to be submitted online. Check schools webpage to find out where and submit your portfolio there.',30));
      reminders.push(new Reminder(10,'SendSnailSchoolFrm','Send Snail School Recommendation','Your counselor should send hard copy (snail mail) school forms by %DATE%','This is a good safe date for your counselors to send thier school forms if they are mailing them via regular mail (ie not online).',30));
      reminders.push(new Reminder(5,'SendSnailRec','Send Snail Mail Recommendation','Your recommenders should send hard copy (snail mail) recommendations by %DATE%','This is a good safe date for your recommenders to send their recommendations if they are mailing them via regular mail (ie not online).',30));
      reminders.push(new Reminder(14,'SubmitOnlineEssays','Submit Online Essays','If you are sending your essays online you should send them by %DATE%','You\'ve been working hard on your essays. %DATE% is the day you should login to your online application system, and press the submit button.',21));
      reminders.push(new Reminder(11,'SendOnlineSchoolFrm','Send Online School Forms','Your couneslor should submit online school forms by %DATE%','This is a good safe date for your counselor to submit school forms online.',15));
      reminders.push(new Reminder(6,'SendOnlineRec','Send Online Recommendation','Your recommenders should submit online recommendations by %DATE%','This is a good safe date for your recommenders to submit their recommendations online.',14));
      reminders.push(new Reminder(0,'SubmissionDate','Application Submission Date','%SCHOOL%\'s application is due %DATE%','This is the date that %SCHOOL% needs to have every part of your application; from essays, to recommendations, to SAT scores. If just one item comes in past this date, you are out of the running.',0));

      var testData = {};

      testData.get = function() {
        return reminders;
      };

      return testData;
    });

}());
