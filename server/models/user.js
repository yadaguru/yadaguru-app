var mongoose = require('mongoose'),
    crypto   = require('crypto'),
    Schema   = mongoose.Schema;

var userSchema = new Schema({
  username: {type: String},
  salt: {type: String},
  hashed_pwd: {type: String}
});

userSchema.methods = {
  authenticate: function(passwordToMatch) {
    return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
  }
}

var User = mongoose.model('User', userSchema);

User.find({}).exec(function(err, collection) {
  if(collection.length === 0) {
    var salt, hash;
    salt = createSalt();
    hash = hashPwd(salt, 'guru'); // TODO: Move admin account creation to config file NOT commited
    User.create({ username: 'yada', salt: salt, hashed_pwd: hash });
  }
});

function createSalt() {
  return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
  var hmac = crypto.createHmac('sha1', salt);
  return hmac.update(pwd).digest('hex');
}

module.exports = User;