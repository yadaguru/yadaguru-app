var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var categorySchema = new Schema({
  categoryName: {type: String},
});

module.exports = mongoose.model('Category', categorySchema);
