import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "../config/config";

import User from "../models/UserModel";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtTokenSrecreet,
};

export default new Strategy(opts, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    console.log('yamilee  ', payload.id)
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
      console.log(error)
  }
});
