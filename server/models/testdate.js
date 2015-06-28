var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var testDateSchema = new Schema({
  testDate: {type: Date},
  registrationDate: {type: Date},
  testType: {type: String}
});

module.exports = mongoose.model('TestDate', testDateSchema);
