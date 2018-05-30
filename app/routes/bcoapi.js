var dbo = require("../models/bco"),
    code = require('../config/codec');
module.exports = function(router) {
    /* 
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
    Description: Docuemnt Entry for BCO collection
    Scope: Entry *
    Date: May 25, 2018
    Alter: 0
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
    */
    /* data entry */
    router.post("/bco/entry", function(req, res) {
        code.codec(function(ucode) {
            var json = req.body;
            json.code = ucode;
            d = new dbo(json);
            result = {};
            d.save(function(err) {
                if (err) {
                    result.code = 304;
                    result.success = false;
                    result.msg = err;
                } else {
                    result.code = 200;
                    result.success = true;
                    result.msg = "New BCO(Barangay Cluster Officer) Successfully added!";
                }
                res.json(result);
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
    router.post("/bco/:id/update", function(req, response) {
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
    router.get("/bco/:id/deactivate", function(req, response) {
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
    router.get("/bco/:id/activate", function(req, response) {
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
        Description: Que BCO Documents
        Scope: list, single que, active list and inactive list
        Date: May 25, 2018
        Alter: 0
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
    */
    /* preview all data query* */
    router.get("/bco/list/", function(req, response) {
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
    router.get("/bco/:id/preview", function(req, response) {
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
    router.get("/bco/inactive/list", function(err, response) {
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
    router.get("/bco/active/list", function(err, response) {
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
        total number of lines: 
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
    */
    return router;
};