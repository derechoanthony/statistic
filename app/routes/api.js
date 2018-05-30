var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = 'Mr.T',
    code = require('../config/codec'),
    bcrypt = require('bcrypt-nodejs');

module.exports = function(router) {
    router.get('/home', function(req, res) {
        res.send('hello tonio!');
    });
    // >> User Registration
    router.post('/user', function(req, res) {
        var data = {};
        var dataEntry = req.body;
        var usr = new User(dataEntry);
        if (req.body.username == null || req.body.username == '' ||
            req.body.password == null || req.body.password == '' ||
            req.body.fname == null || req.body.fname == '' ||
            req.body.mname == null || req.body.mname == '' ||
            req.body.lname == null || req.body.lname == '' ||
            req.body.usrtype == null || req.body.usrtype == '') {
            data.msg = 'Please ensure that username, password, firstname, lastname and user type were provided!';
            data.success = false;
            data.code = 203;
            res.json(data);
        } else {

            usr.save(function(err) {
                if (err) {
                    data.msg = err;
                    data.success = false;
                    data.code = 203;
                    res.send(data);
                } else {
                    data.msg = 'New user created!';
                    data.success = true;
                    data.code = 200;
                    res.send(data);
                }
                console.log(data);
            });

        }
    });

    // >> User Login
    router.post('/authenticate', function(req, res) {
        User.findOne({ 'username': req.body.username }).select('username password status usrtype').exec(function(err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, msg: 'Could not authenticate user', code: 203 });
            } else if (user) {
                if (req.body.password) {
                    var validPassword = user.comparePassword(req.body.password);
                } else {
                    res.json({ success: false, msg: 'No password provided' });
                }
                if (!validPassword) {
                    res.json({ success: false, msg: 'Could not authenticate password', code: 203 });
                } else {
                    console.log(user.status)
                    if (user.status == 'active') {
                        if (user.usrtype == 'co-admin' || user.usrtype == 'encoder' || user.usrtype == 'viewer') {
                            var token = jwt.sign({ username: user.username, id: user._id }, secret, { expiresIn: '24h' });
                            res.json({ success: true, msg: 'User authenticated!', code: 200, token: token });
                        } else {
                            res.json({ success: false, msg: 'Unauthorized user' });
                        }
                    } else {
                        res.json({ success: false, msg: 'User status is In-active' });
                    }
                }
            }
        });
    });
    router.get('/user/list', function(req, response) {
        User.find({}, function(err, res) {
            response.json(res);
        });
    });
    router.get('/user/:id/preview', function(req, response) {
        User.findOne({ _id: req.params.id }, function(err, res) {
            response.json(res);
        });
    });
    router.post('/user/:id/deactivate', function(req, response) {
        var que = {
            _id: req.params.id
        };
        var data = {
            $set: req.body
        };
        var result = {};
        User.updateOne(que, data, function(err, res) {
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
    router.post('/user/:id/update', function(req, response) {
        var que = {
            _id: req.params.id
        };
        var data = {
            $set: req.body
        };
        var result = {};
        bcrypt.hash(req.body.password, null, null, function(err, hash) {
            if (err) return next(err);
            req.body.password = hash;
            console.log('----------hash-------', req.body);
            User.updateOne(que, data, function(err, res) {
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
    });
    router.use(function(req, res, next) {
        var token = req.body.token || req.body.query || req.headers['x-access-token'];
        console.log(req.headers['x-access-token']);
        if (token) {
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    res.json({
                        success: false,
                        message: "Invalid token"
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.json({ success: false, message: "no token provided!" });
        }
    });
    router.post('/me', function(req, res) {
        res.json(req.decoded);
    });
    return router;
}