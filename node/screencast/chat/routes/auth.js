var express = require('express');
var router = express.Router();
//var User = require('models/user').User;
//var HttpError = require('error').HttpError;
//var AuthError = require('models/user').AuthError;
//var async = require('async');

var passport = require('passport');
//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
//passport.use(new GoogleStrategy({
//    clientID: '71605420749-f0jo5vfa0eetnd9aks7m6l7m6f5pjcmb.apps.googleusercontent.com',
//    clientSecret: 'R6ZhgvB-lvtY94S82YjMvOEK',
//    callbackURL: "http://localhost:3000/auth/google/callback"
//},
//        function (accessToken, refreshToken, profile, done) {
//            console.log('from middleware');
//            console.log(profile);
////       User.findOrCreate({ googleId: profile.id }, function (err, user) {
////         return done(err, user);
////       });
//            done();
//        }
//));

router.get('/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login'],
    display : 'popup'
}));


router.get('/google/callback',
        passport.authenticate('google', {failureRedirect: '/login'}),
        function (req, res) {
            console.log('sucesss login');
            res.redirect('/');
        });

//router.post('/', function (req, res, next) {
//    req.session.destroy();
//    res.redirect('/');
//});

//exports.get = router;
module.exports = router;