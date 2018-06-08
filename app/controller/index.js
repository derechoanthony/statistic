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
            var a = [];
            var js;
            bcontainer = res;
            cluster.find({}, function(err, res) {
                for (var i = 0; i < res.length; i++) {
                    d.push(res[i].brngy);
                }
                var arr = d;
                var obj = [];
                var x;
                var unique_array = [];
                var ret_arr = [],
                    filter_brngy = [];
                for (var i = 0; i < arr.length; i++) {
                    obj[arr[i]] = true;
                }
                for (var key in obj) {
                    for (var j = 0; j < bcontainer.length; j++) {
                        if (bcontainer[j].Barangay == key) {
                            filter_brngy.push(key);
                        }
                    }
                    //     for (var j = 0; j < bcontainer.length; j++) {
                    //         if (bcontainer[j].Barangay == key) {

                    //             data.bCount(key, function(r) {
                    //                 if (unique_array.indexOf(r) == -1) {
                    //                     unique_array.push(r);
                    //                 }
                    //                 callback({
                    //                     data: unique_array,
                    //                     success: true
                    //                 });
                    //             });

                    //         }
                    //     }
                }
                // for (var i = 0; i < filter_brngy.length; i++) {
                //     data.bCount(key, function(r) {
                //         unique_array.push(r);

                //     });
                // }
                data.bCount(filter_brngy, function(r) {

                    callback({
                        data: r,
                        success: true
                    });
                });
            });
        }
    });
}

data.bCount = function(key, c) {
    var f = [];

    function count(callback) {
        var k = key.length;
        for (var i = 0; i < key.length; i++) {
            var d = [];
            cluster.find({ brngy: key[i] }, function(req, r) {
                var member = 0;
                var brngy;
                for (var j = 0; j < r.length; j++) {
                    member = member + r[j].famlymember.length;
                    brngy = r[j].brngy;

                }

                d.push({
                    barangay: brngy,
                    cluster_count: r.length,
                    familyleader_count: r.length,
                    familymember_count: member
                });
                if (k == d.length) {
                    callback(d);
                }
            });
        }
    }
    count(function(r) {
        c(r);
    });
};
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