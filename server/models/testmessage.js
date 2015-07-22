var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var testMessageSchema = new Schema({
  satMessage: {type: String},
  satDetail: {type: String},
  actMessage: {type: String},
  actDetail: {type: String},
  testCategory: {type: String}
});

module.exports = mongoose.model('TestMessage', testMessageSchema);
