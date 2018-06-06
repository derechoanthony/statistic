var brangay = require("../models/barangay");
var cluster = require('../models/cluster');
var data = {};
data.getallbarangay = function(callback) {
    brangay.find({}, function(err, res) {
        if (err) {
            callback({
                data: [],
                success: false
            });
        } else {
            callback({
                data: res,
                success: true
            });
        }
    });
};

data.getallbarangaylist = function(callback) {

    brangay.find({}, function(err, res) {
        if (err) {
            callback({
                data: [],
                success: false
            });
        } else {
            var d = [];
            var dd = [];
            var js;
            bcontainer = res;

            // 
            cluster.find({}, function(err, res) {
                for (var i = 0; i < res.length; i++) {
                    d.push(res[i].brngy);
                }
                var arr = d;
                var obj = {};
                var ret_arr = [];
                for (var i = 0; i < arr.length; i++) {
                    obj[arr[i]] = true;
                }
                for (var key in obj) {
                    for (var i = 0; i < bcontainer.length; i++) {
                        if (bcontainer[i].Barangay == key) {
                            ret_arr.push(key);
                        }
                    }
                }
                callback({
                    data: ret_arr,
                    success: false
                });
            });
        }
    });
}

data.remove_duplicates = function(arr, callback) {
    var obj = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = true;
    }
    for (var key in obj) {
        ret_arr.push(key);
    }
    callback(ret_arr);
};
data.findSitio = function(d, callback) {
    brangay.find(d, function(err, res) {
        if (err) {
            callback({
                data: [],
                success: false
            });
        } else {
            callback({
                data: res,
                success: true
            });
        }
    });
};

data.findbrngy = function(d, callback) {
    cluster.find(d, function(err, res) {
        callback(res);
    });
};
module.exports = data;