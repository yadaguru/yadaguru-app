var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var formula = new Schema({
  name: {type: String},
  formula: {type: String}
});

module.exports = mongoose.model('Formula', formula);
