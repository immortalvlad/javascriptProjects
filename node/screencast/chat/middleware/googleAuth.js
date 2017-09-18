var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function (req, res, next) {
    // Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
    passport.use(new GoogleStrategy({
        clientID: '71605420749-f0jo5vfa0eetnd9aks7m6l7m6f5pjcmb.apps.googleusercontent.com',
        clientSecret: 'R6ZhgvB-lvtY94S82YjMvOEK',
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
            function (accessToken, refreshToken, profile, done) {
                console.log('from middleware');
                console.log(profile);
//       User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return done(err, user);
//       });
            done();
            }
    ));
    next();
};
//module.exports = passport;