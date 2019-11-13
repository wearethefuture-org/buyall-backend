const passport = require("koa-passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
};

passport.use(
  new JwtStrategy(opts, function(jwt_payload, done) {
        done(null, jwt_payload);
  })
);

module.exports = passport;
