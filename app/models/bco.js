/* 
    System Given:
        *code
*/
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcoSchema = new Schema({
        code: {
            type: String,
            lowercase: true,
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
        brgy: {
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

module.exports = mongoose.model('bco', bcoSchema);