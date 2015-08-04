var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var settingsSchema = new Schema({
  summerCutoffDate: {type: Date},
});

module.exports = mongoose.model('Settings', settingsSchema);
