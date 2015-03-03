var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var fs = require('fs');

var secret = JSON.parse(fs.readFileSync('./secret.json'));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: secret[1].client_id,
    clientSecret: secret[1].client_secret,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(request, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

module.exports = passport;