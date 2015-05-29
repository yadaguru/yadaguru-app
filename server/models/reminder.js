var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var reminderSchema = new Schema({
  field: {type: String},
  fullName: {type: String},
  message: {type: String},
  detail: {type: String},
  formula: {type: Number}
});

module.exports = mongoose.model('Reminder', reminderSchema);
