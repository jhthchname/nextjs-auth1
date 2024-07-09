const path = require("path")
const fs = require("fs")
const dotenv = require("dotenv")

const env = process.env.NODE_ENV
const envFile = `.env.${env}`

if (fs.existsSync(envFile)) {
  console.log(`Using ${envFile} file to supply config environment variables`)
  dotenv.config({ path: envFile })
}

const PORT = process.env.PORT || ""
const NODE_ENV = process.env.NODE_ENV || ""
const MONGO_URL = process.env.MONGO_URL || ""
const MONGO_USER = process.env.MONGO_USER || ""
const MONGO_PASS = process.env.MONGO_PASS || ""

module.exports = {
    PORT,
    NODE_ENV,
    MONGO_URL,
    MONGO_USER,
    MONGO_PASS
}
