var User = require('../models/user');
var FacebookStrategy = require('passport-facebook').Strategy;
var FACEBOOK_APP_ID  = "127260658134466";
var FACEBOOK_APP_SECRET = "28700a109b0b0747f2c2df5b2897159d";
module.exports = function(app, passport) {

    passport.use(new FacebookStrategy({
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: "http://localhost:8000/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
        function (accessToken, refreshToken, profile, done) {
            // User.findOrCreate(..., function (err, user) {
            //     if (err) {
            //         return done(err);
            //     }
            //     done(null, user);
            // });
            done(null, profile);
        }
    ));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {successRedirect: '/',failureRedirect: '/login'}));
    app.get('/auth/facebook',
        passport.authenticate('facebook', {
            scope: 'read_stream'
        })
    );
    return passport;
}