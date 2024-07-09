const express = require("express")
const next = require("next")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const bodyParser = require("body-parser")

const { PORT, NODE_ENV } = require("./common/settings.jsx")

const dev = NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()
const server = express()

app
  .prepare()
  .then(async () => {
    server
    .use(express.json({ limit: "100mb" }))
    .use(express.urlencoded({ extended: true }))
    .use(cors())
    .use(cookieParser())
    .use(bodyParser.json())
    .use("/", express.static("src"))

    server.all("*", (req, res) => {
        return handle(req, res)
    })

    server.listen(PORT, (err) => {
        if (err) throw err
        console.log(`🚀 Server ready at http://localhost:${PORT}`)
        // console.log(`🚀 Database ready at PORT 27017`)
    })
}).catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })