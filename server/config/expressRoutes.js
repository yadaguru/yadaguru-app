module.exports = function(app) {
  var authRouter = require('../routes/authRoutes')();
  app.use('/api/auth', authRouter);

  var userRouter = require('../routes/userRoutes')();
  app.use('/api/users', userRouter);

  var Reminder = require('../models/reminder');
  var reminderRouter = require('../routes/reminderRoutes')(Reminder);
  app.use('/api/reminders', reminderRouter);

  var TestDate = require('../models/testdate');
  var testDateRouter = require('../routes/testDateRoutes')(TestDate);
  app.use('/api/test-dates', testDateRouter);

  var TestMessage = require('../models/testmessage');
  var testMessageRouter = require('../routes/testMessageRoutes')(TestMessage);
  app.use('/api/test-messages', testMessageRouter);

  var Category = require('../models/category');
  var CategoryRouter = require('../routes/categoryRoutes')(Category);
  app.use('/api/categories', CategoryRouter);

  var Faq = require('../models/faq');
  var faqRouter = require('../routes/faqRoutes')(Faq);
  app.use('/api/faqs', faqRouter);

  var exportRouter = require('../routes/exportRoutes')();
  app.use('/api/export', exportRouter);
}
