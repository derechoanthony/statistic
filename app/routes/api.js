var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = 'Mr.T';

module.exports = function(router) {
    router.get('/home', function(req, res) {
        res.send('hello tonio!');
    });
    // >> User Registration
    router.post('/user', function(req, res) {
        var data = {};
        var usr = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
        });
        if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '') {
            data.msg = 'Please ensure that username, password and email were provided!';
            data.success = false;
            data.code = 203;
            res.json(data);
        } else {
            usr.save(function(err) {
                if (err) {
                    data.msg = err.errmsg;
                    data.success = false;
                    data.code = 203;
                    res.send(data);
                } else {
                    data.msg = 'New user created!';
                    data.success = true;
                    data.code = 200;
                    res.send(data);
                }
            });
        }
    });

    // >> User Login
    router.post('/authenticate', function(req, res) {
        User.findOne({ 'username': req.body.username }).select('email username password').exec(function(err, user) {
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
                    var token = jwt.sign({ username: user.username, email: user.email, id: user._id }, secret, { expiresIn: '24h' });
                    res.json({ success: true, msg: 'User authenticated!', code: 200, token: token });
                }
            }
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