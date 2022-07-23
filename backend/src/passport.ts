const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID = "539519217944-ha3mqiegausn7rpahp97nu5o07j4pmi4.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
        // eslint-disable-next-line consistent-return
    (async (req: any, accessToken: any, refreshToken: any, profile: any, cb: any) => {
      const defaultUser = {
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        googleId: profile.id,
      };
      console.log(req, accessToken, refreshToken)
      return cb(null, defaultUser);
    })

  )
);
passport.serializeUser((user: any, done: any) => {
  done(null, user);
});

passport.deserializeUser((user: any, done: any) => {
  done(null, user);
});
