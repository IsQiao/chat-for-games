var mongoose = require('mongoose');
    Schema = mongoose.Schema;

var User = mongoose.model('User', new Schema({
  email: String,
  password: String
}));

module.exports = User;
