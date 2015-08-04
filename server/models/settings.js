var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var settingsSchema = new Schema({
  summerCutoffMonth: {type: Number},
  summerCutoffDay: {type: Number}
});

module.exports = mongoose.model('Settings', settingsSchema);
