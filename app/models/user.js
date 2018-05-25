var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var userSchema = new Schema({
    username : {type: String, lowercase: true, required: true},
    password : {type: String, required: true},
    email : {type: String, required: true, lowercase: true, unique: true}
});

userSchema.pre('save', function(next) {
    var usr = this;
    bcrypt.hash(usr.password, null, null, function(err, hash){
        if(err) return next(err);
        usr.password = hash;
        next();
    });
  next();
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);