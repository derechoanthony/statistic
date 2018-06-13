var usr = require("./app/models/user");
var mongoose = require('mongoose');
var json = [{
        "fname": "ben",
        "mname": "leens",
        "lname": "go",
        "username": "bengo",
        "usrtype": "admin",
        "password": "$2a$10$2zFZIoYYzQ7koKBiygj2ZerDD4qwbedjfsjx7Y5m.WmVuk7agWu16",
        "pwd": "4bGxWUIY",
        "status": "active",
        "created": "5b175d3effa60da4cb3500b4"
    }



];
mongoose.connect('mongodb://localhost:27017/db', function(err) {
    if (err) {
        console.log('Not connected to database; ' + err);
    } else {
        console.log('Successfully connected to mongo database!');
    }
});
for (var i = 0; i < json.length; i++) {
    // console.log(json[i]);
    d = new usr(json[i]);
    var data = {};
    d.save(function(err) {
        if (err) {
            data.msg = err;
            data.success = false;
            data.code = 203;
        } else {
            data.msg = 'user data inserted!';
            data.success = true;
            data.code = 200;
        }
        console.log(data);
    });
}