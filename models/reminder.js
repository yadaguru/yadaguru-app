var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var reminder = new Schema({
  field: {type: String},
  fullName: {type: String},
  message: {type: String},
  detail: {type: String},
  reminder: {type: Number}
});

module.exports = mongoose.model('Reminder', reminder);
