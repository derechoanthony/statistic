var tf = require('../models/taskforce');
var ObjectID = require('mongodb').ObjectID;
module.exports = function(router) {
    //entry
    router.post("/taskforce/entry", function(req, res) {
        var j = {};
        var data = {};
        var timeInMs = Date.now();

        var taskforcedata = req.body;
        taskforcedata.code = timeInMs;
        console.log(taskforcedata);
        d = new tf(taskforcedata);
        d.save(function(err) {
            if (err) {
                console.log(err);
                data.msg = err.errmsg;
                data.success = false;
                data.code = 203;
                res.send(data);
            } else {
                data.msg = 'New Task force data inserted!';
                data.success = true;
                data.code = 200;
                res.send(data);
            }
        });
    });
    //update
    // router.post("/taskforce/:id/update", function(req, res) {
    //
    // tf.update({ _id: ObjectID(id) }, { $set: req.body });
    // res.send(req.params.id);
    // tf.findById(req.params.id, function(err, res) {
    //     d = new tf(req.body);
    //     d.save().then(d => {
    //             res.json('Update complete');
    //         })
    //         .catch(err => {
    //             res.status(400).send("unable to update the database");
    //         });
    // });
    // tf.update({ _id:req.params.id }, { $set: req.body });

    // });

    //query
    // router.get("/taskforce/:id/update/", function (req, res) {

    // });
    //single

    //deactivate
    return router;
}