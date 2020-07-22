const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../model/Users');

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: 'http://127.0.0.1:3000/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, cb) => {
        const newUsers = {
          googleId: profile.id,
          dispayname: profile.displayName,
          firstname: profile.name.familyName,
          lastname: profile.name.givenName,
          image: profile.photos[0].value,
        };
        try {
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            cb(null, user);
          } else {
            user = await User.create(newUsers);
            cb(null, user);
          }
        } catch (error) {
          cb(null, error);
        }
        /* User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return cb(err, user);
        }); */
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
