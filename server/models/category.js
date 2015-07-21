var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var categorySchema = new Schema({
  _id: {type: Number},
  categoryName: {type: String}
});

module.exports = mongoose.model('Category', categorySchema);
