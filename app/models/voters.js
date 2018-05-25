var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var votersSchema = new Schema({
    Barangay: {
        type: String,
        lowercase: true,
        required: true
    },
    brngydata: {
        type: Object,
        required: true
    },
    entrydate: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('brngyvotersdata', votersSchema);