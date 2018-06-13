var dbo = require('../models/taskforce'),
    code = require('../config/codec'),
    ObjectID = require('mongodb').ObjectID;
module.exports = function(router) {
    /* 
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
        Description: Docuemnt Entry for taskfoce collection
        Scope: Entry *
        Date: May 25, 2018
        Alter: 0
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
    */
    /* data entry */
    router.post("/taskforce/entry", function(req, res) {
        code.codec(function(ucode) {
            var j = {},
                data = {},
                timeInMs = ucode,
                taskforcedata = req.body;
            taskforcedata.code = timeInMs;
            d = new dbo(taskforcedata);
            d.save(function(err) {
                if (err) {
                    data.msg = err.errmsg;
                    data.success = false;
                    data.code = 304;
                } else {
                    data.msg = 'New Task force data inserted!';
                    data.success = true;
                    data.code = 200;
                }
                res.json(data);
            });
        });
    });
    /* 
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
        Description: Document Updates
        Scope: Update *
        Date: May 25, 2018
        Alter: 0
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
    */
    /* data update */
    router.post("/taskforce/:id/update", function(req, response) {
        var newvalues = {
                $set: req.body
            },
            que = {
                code: req.params.id
            };
        var result = {};
        dbo.updateOne(que, newvalues, function(err, res) {
            if (err) {
                result.code = 304;
                result.success = false;
                result.msg = err;
            } else {
                result.code = 200;
                result.success = true;
                result.msg = {
                    code: req.params.id,
                    msg: "successfully updated!"
                };
            }
            response.json(result);
        });
    });
    /* 
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
        Description: Status Authentication
        Scope: Activation and Deactivate document status
        Date: May 25, 2018
        Alter: 0
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
    */
    /* deactivate specifi data */
    router.get("/taskforce/:id/deactivate", function(req, response) {
        var result = {},
            que = {
                code: req.params.id
            },
            stmnt = {
                $set: {
                    status: "Inactivate"
                }
            }
        dbo.updateOne(que, stmnt, function(err, res) {
            if (err) {
                result.code = 304;
                result.success = false;
                result.msg = err;
            } else {
                result.code = 200;
                result.success = false;
                result.msg = {
                    code: req.params.id,
                    msg: "successfully deactivated!"
                };
            }
            response.send(result);
        });
    });
    /* activate specific data */
    router.get("/taskforce/:id/activate", function(req, response) {
        var result = {},
            que = {
                code: req.params.id
            },
            stmnt = {
                $set: {
                    status: "activate"
                }
            }
        dbo.updateOne(que, stmnt, function(err, res) {
            if (err) {
                result.code = 304;
                result.success = false;
                result.msg = err;
            } else {
                result.code = 200;
                result.success = false;
                result.msg = {
                    code: req.params.id,
                    msg: "successfully deactivated!"
                };
            }
            response.send(result);
        });
    });
    /* 
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
        Description: Que Taskforce Documents
        Scope: list, single que, active list and inactive list
        Date: May 25, 2018
        Alter: 0
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
    */
    /* preview all data query* */
    router.get("/taskforce/list/", function(req, response) {
        var result = {};
        dbo.find({}, function(err, res) {
            if (err) {
                result.code = 304;
                result.success = false;
                result.msg = err;
            } else {
                result.code = 200;
                result.success = true;
                result.msg = res;
            }
            response.json(result);
        });
    });
    /* preview specific data */
    router.get("/taskforce/:id/preview", function(req, response) {
        var result = {},
            que = {
                code: req.params.id
            };
        dbo.findOne(que, function(err, res) {
            if (err) {
                result.code = 304;
                result.success = false;
                result.msg = err;
            } else {
                result.code = 200;
                result.success = true;
                result.msg = res;
            }
            response.send(result);
        });
    });
    /* preview all In-active data */
    router.get("/taskforce/inactive/list", function(err, response) {
        var result = {},
            que = {
                status: "Inactivate"
            };
        dbo.find(que, function(err, res) {
            if (err) {
                result.code = 304;
                result.success = false;
                result.msg = err;
            } else {
                result.code = 200;
                result.success = true;
                result.msg = res;
            }
            response.send(result);
        });
    });
    /* preview all active data */
    router.get("/taskforce/active/list", function(err, response) {
        var result = {},
            que = {
                status: "active"
            };
        dbo.find(que, function(err, res) {
            if (err) {
                result.code = 304;
                result.success = false;
                result.msg = err;
            } else {
                result.code = 200;
                result.success = true;
                result.msg = res;
            }
            response.send(result);
        });
    });
    /* 
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
        return all the api result 
        total number of lines: 219
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
        */
    return router;
}