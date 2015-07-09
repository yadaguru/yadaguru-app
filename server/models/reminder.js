var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var reminderSchema = new Schema({
  name: {type: String},
  message: {type: String},
  detail: {type: String},
  lateMessage: {type: String},
  lateDetail: {type: String},
  category: {type: String},
  timeframes: {type: [String]}
});

module.exports = mongoose.model('Reminder', reminderSchema);
