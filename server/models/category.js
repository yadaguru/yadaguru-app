var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var categorySchema = new Schema({
  categoryName: {type: String}
});

var Category = mongoose.model('Category', categorySchema);
module.exports = Category;
