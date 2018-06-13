var voters = require('../models/voters');
module.exports = function(router) {
    router.post("/voters/upload/data", function(req, res) {
        var j = {};
        var data = {};
        var votersdata = req.body;
        console.log(votersdata)
        d = new voters(votersdata);
        d.save(function(err) {
            if (err) {
                data.msg = err.errmsg;
                data.success = false;
                data.code = 203;
                res.send(data);
            } else {
                data.msg = 'New barangay data inserted!';
                data.success = true;
                data.code = 200;
                res.send(data);
            }
        });
    });
    router.get('/comelec/data', function(req, response) {
        var result = {};
        voters.find({}, function(err, res) {
            if (err) {
                result.code = 304;
                result.success = false;
                result.msg = err;
            } else {
                result.code = 200;
                result.success = true;
                result.msg = res;
                console.log(res)
            }
            response.json(result);
        });
    });
    router.get('/brngy/voters/:id/preview', function(req, res) {
        var id = req.params.id;
        var data = {};
        voters.find({ '_id': id }).select('Barangay brngydata entrydate uid').exec(function(err, vtrs) {
            if (err) {
                data.msg = err.errmsg;
                data.success = false;
                data.code = 203;
            } else {
                data.msg = vtrs;
                data.success = true;
                data.code = 200;
            }
            res.json(data);
        });
    });
    return router;
};