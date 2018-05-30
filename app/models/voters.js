var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    votersSchema = new Schema({
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