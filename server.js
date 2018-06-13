/* packages */
var express = require('express'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    path = require('path'),
    app = express();
/* porst config */
var port = process.env.PORT || 8000,
    router = express.Router();
/* API's */
var appRoute = require('./app/routes/api')(router),
    appRoutevoters = require('./app/routes/votersapi')(router),
    appRoute_TF = require('./app/routes/taskforceapi')(router),
    appRoute_BCO = require('./app/routes/bcoapi')(router),
    appRoute_print = require('./app/routes/print')(router),
    appRoute_cluster = require('./app/routes/clusterapi')(router);
/* logger */
// var winston = require('./app/config/winston');

/*  middleware */
app.use(morgan('dev'));
// app.use(morgan('combined', {
//     stream: winston.stream
// }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
/* Api routes */
app.use("/api", appRoute);
app.use("/api", appRoutevoters);
app.use("/api", appRoute_TF);
app.use("/api", appRoute_BCO);
app.use("/api", appRoute_cluster);
app.use("/api/print", appRoute_print);


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