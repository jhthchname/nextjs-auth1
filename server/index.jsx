const express = require("express");
const next = require("next");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const { v4 } = require("uuid");
// api
const baseRoute = require("./route/index.jsx");
// env
const { PORT, NODE_ENV, JWT_SECRET } = require("./common/settings.jsx");
// connect db
require("./common/db.jsx");

const dev = NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

app
  .prepare()
  .then(async () => {
    server
      .use(
        session({
          genid: (_) => v4(),
          secret: JWT_SECRET,
          resave: false,
          saveUninitialized: false,
          cookie: {
            secure: true,
          },
        })
      )
      .use(express.json({ limit: "100mb" }))
      .use(express.urlencoded({ extended: true }))
      .use(
        cors({
          credentials: true,
          origin: true,
          exposedHeaders: "*",
        })
      )
      .use(cookieParser())
      .use(bodyParser.json())
      .use(passport.initialize())
      .use(passport.session())
      .use("/", express.static("src"))
      .use(baseRoute);

    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`🚀 Server ready at http://localhost:${PORT}`);
      // console.log(`🚀 Database ready at PORT 27017`)
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
