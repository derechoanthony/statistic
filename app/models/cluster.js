var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    clusterschema = new Schema({
        brngy: {
            type: String,
            lowercase: true,
            required: true
        },
        sitio: {
            type: String,
            lowercase: true,
            required: true
        },
        bco: {
            type: String,
            required: true
        },
        taskforce: {
            type: Object,
            required: true
        },
        clusterleader: {
            type: Object,
            required: true
        },
        familyleader: {
            type: Object,
            required: true
        },
        famlymember: {
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

module.exports = mongoose.model('clusterData', clusterschema);