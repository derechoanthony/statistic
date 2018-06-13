var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    barangayschema = new Schema({
        Barangay: {
            type: String,
            lowercase: true,
            required: true
        },
        code: {
            type: String,
            lowercase: true,
            required: true
        },
        data: {
            type: Object,
            required: true
        }
    });

module.exports = mongoose.model('Barangaydata', barangayschema);