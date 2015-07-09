var mongoose = require('mongoose'),
    crypto   = require('crypto'),
    Schema   = mongoose.Schema;

var userSchema = new Schema({
  username: {type: String},
  salt: {type: String},
  hashedPassword: {type: String},
  roles: {type: Array}
});

var createSalt = function() {
  return crypto.randomBytes(128).toString('base64');
};

var hashPwd = function(salt, pwd) {
  var hmac = crypto.createHmac('sha1', salt);
  return hmac.update(pwd).digest('hex');
};

userSchema.statics = {
  createSalt: createSalt,
  hashPwd: hashPwd
}

userSchema.methods = {
  authenticate: function(passwordToMatch) {
    return hashPwd(this.salt, passwordToMatch) === this.hashedPassword;
  }
}

var User = mongoose.model('User', userSchema);
module.exports = User;
