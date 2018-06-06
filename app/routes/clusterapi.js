var cluster = require('../models/cluster');
var brangay = require("../controller/index");
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
            cl_arr = [];
        brangay.getallbarangaylist(function(res) {
            if (res.data.length > 0) {
                for (var i = 0; i < res.data.length; i++) {
                    // console.log(res.data[i]);
                    cluster.find({ brngy: res.data[i] }, function(req, r) {
                        for (var i = 0; i < r.length; i++) {
                            var clusterleader_ = r[i].clusterleader[0].cllname + '*' + r[i].clusterleader[0].clfname + '*' + r[i].clusterleader[0].clmname;
                            console.log(clusterleader_);
                            cl_arr.push(clusterleader_);
                        }
                    });
                }
            } else {
                response.send({ success: false, data: [] })
            }
        });
    });
    return router;
}