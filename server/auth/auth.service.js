import crypto from "crypto";
import User from "../model/user.model.js";
import { SECRET_TOKEN } from "../common/settings.js";

// Function to generate a random salt
const generateSalt = () => {
  return crypto.randomBytes(16).toString("hex");
};

// Function to hash the password with the salt
const hashPassword = (password, salt) => {
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512");
  return hash.toString("hex");
};

// Function to compare a password with the hashed password
const comparePasswords = async (password, hashedPassword, salt) => {
  const hash = await crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  const match = hash === hashedPassword;

  return match;
};

const hashedPassword = (password) => {
  const salt = generateSalt();
  const newPwd = hashPassword(password, salt);
  return { newPwd, salt };
};

const setAuthCookie = (res, user) => {
  if (user) {
    res.cookie("token", user?.token, { httpOnly: true });
    res.cookie(
      "user",
      {
        id: user?._id,
        email: user?.email,
        firstName: user?.firstName,
        lastName: user?.lastName,
      },
      { httpOnly: true }
    );
  }
  return res;
};

const generateToken = (user) => {
  const header = Buffer.from(
    JSON.stringify({ alg: "HS256", typ: "JWT" })
  ).toString("base64");
  const payloadData = { _id: user?._id, exp: Date.now() + 12 * 60 * 60 * 1000 };
  const payload = Buffer.from(JSON.stringify(payloadData)).toString("base64");

  const signature = crypto
    .createHmac("sha256", SECRET_TOKEN)
    .update(`${header}.${payload}`)
    .digest("base64");
  return `${header}.${payload}.${signature}`;
};

const verifyToken = async (token) => {
  let newToken = token?.replace("Bearer ", "");
  if (!newToken || newToken?.toString()?.length === 0)
    throw new Error("Invalid token");
  const [header, payload, signature] = newToken?.split(".");
  const expectedSignature = crypto
    .createHmac("sha256", SECRET_TOKEN)
    .update(`${header}.${payload}`)
    .digest("base64");
  if (signature !== expectedSignature) {
    throw new Error("Invalid token signature");
  }
  const decodedPayload = JSON.parse(Buffer.from(payload, "base64").toString());
  if (Date.now() > decodedPayload?.exp) {
    throw new Error("Token has expired");
  }

  let user = await User.findById(decodedPayload?._id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export {
  hashedPassword,
  comparePasswords,
  setAuthCookie,
  generateToken,
  verifyToken,
};
