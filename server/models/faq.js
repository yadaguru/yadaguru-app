var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var faqSchema = new Schema({
  content: {type: String},
});

module.exports = mongoose.model('Faq', faqSchema);
