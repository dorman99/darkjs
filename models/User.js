var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,
	email: {type: String, required:true, unique:true},
	password: String,
});

var User = mongoose.model('user', userSchema);

module.exports = User