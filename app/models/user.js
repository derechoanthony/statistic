var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    userSchema = new Schema({
        username: {
            type: String,
            lowercase: true,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        pwd: {
            type: String,
            required: true
        },
        fname: {
            type: String,
            required: true,
            lowercase: true
        },
        mname: {
            type: String,
            required: true,
            lowercase: true
        },
        lname: {
            type: String,
            required: true,
            lowercase: true
        },
        usrtype: {
            type: String,
            required: true,
            lowercase: true
        },
        created: {
            type: String,
            required: true,
            lowercase: true
        },
        status: {
            type: String,
            required: true,
            lowercase: true
        }
    });

userSchema.pre('save', function(next) {
    var usr = this;
    bcrypt.hash(usr.password, null, null, function(err, hash) {
        if (err) return next(err);
        usr.password = hash;
        next();
    });
    next();
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);