var brangay = require("../models/barangay"),
    cluster = require('../models/cluster'),
    User = require('../models/user'),
    data = {};
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
            var d = [],
                a = [],
                js;
            bcontainer = res;
            cluster.find({}, function(err, res) {
                for (var i = 0; i < res.length; i++) {
                    d.push(res[i].brngy);
                }
                var arr = d,
                    obj = [],
                    x, unique_array = [],
                    ret_arr = [],
                    filter_brngy = [];
                for (var a = 0; a < arr.length; a++) {
                    obj[arr[a]] = true;
                }
                for (var key in obj) {
                    for (var j = 0; j < bcontainer.length; j++) {
                        if (bcontainer[j].Barangay == key) {
                            filter_brngy.push(key);
                        }
                    }
                }
                data.bCount(filter_brngy, function(r) {
                    callback({
                        data: r,
                        success: true
                    });
                });
            });
        }
    });
};

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
data.getAllcl = function(d, callback) {
    var r = {};
    cluster.find(d, function(err, res) {
        data.filtercluster(res, function(response) {
            if (err) {
                r.success = false;
                r.msg = err;
            } else {
                r.success = true;
                r.msg = response;
            }
            callback(r);
        });
    });
};
data.filtercluster = function(d, c) {
    var data = d,
        cl_array = [],
        obj = {},
        ret_arr = [],
        fam_cnt = 0,
        z = [],
        result,
        result_arr = [];
    for (var i = 0; i < data.length; i++) {
        var cldata = data[i].clusterleader[0],
            lname = cldata.cllname,
            fname = cldata.clfname,
            mname = cldata.clmname,
            clusterLeader;
        clusterLeader = lname + "*" + fname + "*" + mname;
        cl_array.push(clusterLeader);
    }
    arr = cl_array;
    for (var k = 0; k < arr.length; k++) {
        obj[arr[k]] = true;
    }
    for (var key in obj) {
        ret_arr.push(key);
    }
    for (var j = 0; j < ret_arr.length; j++) {
        var arr_collection = ret_arr[j].split('*');
        for (var g = 0; g < data.length; g++) {
            var col_cldata = data[g].clusterleader[0],
                col_lname = col_cldata.cllname,
                col_fname = col_cldata.clfname,
                col_mname = col_cldata.clmname;
            if ((col_lname == arr_collection[0]) && (col_fname == arr_collection[1]) && (col_mname == arr_collection[2])) {
                result = {
                    cl_leader: ret_arr[j],
                    family_count: data[g].familyleader.length,
                    familymem_count: data[g].famlymember.length
                };
                result_arr.push(result);
            }
        }
        var fl_cnt = 0,
            fm_cnt = 0,
            fullname = {},
            res = {};
        for (var l = 0; l < result_arr.length; l++) {
            if (result_arr[l].cl_leader === ret_arr[j]) {
                fl_cnt = fl_cnt + result_arr[l].family_count;
                fm_cnt = fm_cnt + result_arr[l].familymem_count;
                var s = ret_arr[j].split('*');
                fullname.lname = s[0];
                fullname.fname = s[1];
                fullname.mname = s[2];
                res = {
                    clLeader: [fullname],
                    fl_cnt: fl_cnt,
                    fm_cnt: fm_cnt,
                }

            }
        }
        z.push(res);
    }
    c(z);
};
data.getAllFam = function(d, callback) {
    var cl_array = [];
    cluster.find({ brngy: d.brngy }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            var cldata = res[i].clusterleader[0],
                lname = cldata.cllname,
                fname = cldata.clfname,
                mname = cldata.clmname,
                clusterLeader;

            if ((lname == d.lname) && (fname == d.fname) && (mname == d.mname)) {
                cl_array.push(res[i]);
            }
        }
        callback(cl_array);
    });
};
module.exports = data;