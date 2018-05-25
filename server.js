//packages
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var path = require('path');
var app = express();
/* porst config */
var port = process.env.PORT || 8000;
var router = express.Router();
/* API's */
var appRoute = require('./app/routes/api')(router);
var appRoutevoters = require('./app/routes/votersapi')(router);
var appRoute_TF = require('./app/routes/taskforceapi')(router);
var social = require('./app/passport/passport')(app, passport);
/* logger */
var winston = require('./app/config/winston');

// middleware
// app.use(morgan('dev'));
app.use(morgan('combined', {
    stream: winston.stream
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))
app.use("/api", appRoute);
app.use("/api", appRoutevoters);
app.use("/api", appRoute_TF);


// db connection
mongoose.connect('mongodb://localhost:27017/db', function(err) {
    if (err) {
        console.log('Not connected to database; ' + err);
    } else {
        console.log('Successfully connected to mongo database!');
    }
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port, function() {
    console.log("*running server on port " + port + "");
});