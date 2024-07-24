import passport from "passport";
import User from "../model/user.model.js";
import setUp from "../auth/passport/local.js";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

setUp(User);

const authController = {
  signin: async (args) => {
    return new Promise((resolve, reject) => {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          reject(err);
        }
        if (!user) {
          reject(info);
        }
        resolve(user);
      })({ body: args }, {});
    });
  },
  signout: async (args) => {
    return await User.findByIdAndUpdate(
      { _id: args?._id },
      { token: null, updatedOn: new Date() },
      { new: true }
    );
  },
};

export default authController;
