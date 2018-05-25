var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var taskSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        lowercase: true,
        required: true
    },
    lname: {
        type: String,
        lowercase: true,
        required: true
    },
    taskforce: {
        type: String,
        lowercase: true,
        required: true
    },
    barangay: {
        type: String,
        lowercase: true,
        required: true
    },
    bco: {
        type: String,
        lowercase: true,
        required: true
    },
    regdate: {
        type: String,
        lowercase: true,
        required: true
    },
    status: {
        type: String,
        lowercase: true,
        required: true
    }

});

module.exports = mongoose.model('taskforce', taskSchema);