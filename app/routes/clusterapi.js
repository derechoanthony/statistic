var cluster = require('../models/cluster');
var brangay = require("../controller/index");
var User = require('../models/user');
module.exports = function(router) {
    router.post("/create/cluster", function(req, res) {
        console.log(">>>", req.body);
        d = new cluster(req.body);
        var data = {};
        d.save(function(err) {
            if (err) {
                data.msg = err.errmsg;
                data.success = false;
                data.code = 203;
                res.send(data);
            } else {
                data.msg = 'New cluster data inserted!';
                data.success = true;
                data.code = 200;
                res.send(data);
            }
        });
    });
    router.post("/sitio/list", function(req, response) {
        var d = req.body.data;
        var sitioContainer = [];
        brangay.findSitio({ Barangay: d }, function(res) {
            for (var i = 0; i < res.data.length; i++) {
                var cont = res.data[i].data;
                for (var j = 0; j < cont.length; j++) {
                    sitioContainer.push(cont[j]);
                }
            }
            response.send(sitioContainer);
        });
    });
    router.get("/brangay/list", function(req, response) {
        brangay.getallbarangay(function(res) {
            var brngy_list = [];
            var d = res.data;
            for (var i = 0; i < d.length; i++) {
                brngy_list.push(d[i].Barangay);
            }
            brangay.remove_duplicates(brngy_list, function(res) {
                response.send(res);
            });
        });
    });
    router.get("/brangay/record/count", function(req, response) {
        var brngy_list = [],
            cl_arr = [],
            v = 0;
        brangay.getallbarangaylist(function(res) {
            if (res.data.length > 0) {
                response.send({ success: false, data: res.data });
            } else {
                response.send({ success: false, data: [] });
            }
            console.log(res);
        });
    });

    router.post("/barangy/cluster/record", function(req, res) {
        brangay.getAllcl(req.body, function(r) {
            res.send(r);
        });
    });

    router.post("/barangy/fmleader/record", function(req, res) {
        brangay.getAllFam(req.body, function(r) {
            if (r.length > 0) {
                res.send({ success: true, data: r });
            } else {
                res.send({ success: false, data: r });
            }
        });
    });
    router.get("/cluster/:id/preview", function(req, response) {
        var result = {},
            que = {
                _id: req.params.id
            };
        User.findOne(que, function(err, res) {
            if (err) {
                result.code = 304;
                result.success = false;
                result.msg = err;
            } else {
                if (res.usrtype == "taskforce") {
                    result.code = 200;
                    result.success = true;
                    result.msg = res;
                } else {
                    result.code = 304;
                    result.success = false;
                    result.msg = "Not taskforce.";
                }
            }
            response.send(result);
        });
    });


    return router;
};