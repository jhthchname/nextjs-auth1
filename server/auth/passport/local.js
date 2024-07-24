import passport from "passport";
import { Strategy } from "passport-local";
import { comparePasswords, generateToken } from "../auth.service.js";

const Authenticate = async (user, email, password, done) => {
  user
    .findOne({ email: email })
    .then(async (users) => {
      if (!users) {
        return done(undefined, false, {
          // message: "ไม่พบผู้ใช้งานนี้ในระบบ",
          message: "อีเมลไม่ถูกต้อง",
        });
      }
      if (!users?.password || users?.password?.toString().length === 0)
        return done(undefined, false, {
          message: "กรุณาตั้งรหัสผ่านก่อนเข้าสู่ระบบ",
        });
      if (
        !users?.salt ||
        users?.salt?.toString().length === 0 ||
        users?.salt?.toString().length < 32
      )
        return done(undefined, false, {
          message: "กรุณาตั้งรหัสผ่านก่อนเข้าสู่ระบบ",
        });
      const checkPwd = await comparePasswords(
        password,
        users?.password,
        users?.salt
      );
      if (checkPwd) {
        let token = await generateToken(users);
        console.log("token==========>", token);
        const newUser = await user.findOneAndUpdate(
          { email: email },
          { token: token }
        );
        return done(undefined, { ...newUser?._doc }, null);
      } else {
        return done(undefined, false, {
          message: "รหัสผ่านไม่ถูกต้อง",
        });
      }
    })
    .catch((err) => {
      return done(err, false, {
        message: "Something went wrong, please try again.",
      });
    });
};

const setUp = async (user) => {
  passport.use(
    "local",
    new Strategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      function (email, password, done) {
        return Authenticate(user, email, password, done);
      }
    )
  );
};

export default setUp;
