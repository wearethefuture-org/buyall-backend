const passport = require('koa-passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserService = require('../services/user');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    const userService = new UserService();

    const user = await userService.getUserByEmail(jwt_payload.user.email);

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    };
  })
);

module.exports = passport;
