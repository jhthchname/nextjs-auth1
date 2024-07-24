import path from "path";
import fs from "fs";
import dotenv from "dotenv";

const env = process.env.NODE_ENV;
const envFile = `.env.${env}`;
console.log(`envFile: ${envFile}`);
if (fs.existsSync(envFile)) {
  console.log(`Using ${envFile} file to supply config environment variables`);
  dotenv.config({ path: envFile });
}

const PORT = process.env.PORT || "";
const NODE_ENV = process.env.NODE_ENV || "";
const MONGO_URL = process.env.MONGO_URL || "";
const MONGO_USER = process.env.MONGO_USER || "";
const MONGO_PASS = process.env.MONGO_PASS || "";
const JWT_SECRET = process.env.JWT_SECRET || "";
const SECRET_TOKEN = process.env.SECRET_TOKEN || "";

export {
  PORT,
  NODE_ENV,
  MONGO_URL,
  MONGO_USER,
  MONGO_PASS,
  JWT_SECRET,
  SECRET_TOKEN,
};
