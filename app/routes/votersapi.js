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
    router.get('/brngy/voters/:id', function(req, res) {
        var id = req.params.id;


        voters.findOne({ '_id': id }).select('Barangay brngydata entrydate uid').exec(function(err, vtrs) {
            // if (err) throw err;
            // if (!user) {
            //     res.json({ success: false, msg: 'Could not authenticate user', code: 203 });
            // } else if (user) {
            //     console.log(voters.brngydata)
            // }
            console.log(vtrs);
        });



        res.send(id);
    });

    return router;
};