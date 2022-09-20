// express server listening on port 3000
const express = require("express");
require("dotenv").config();
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("./config");
const mongoose = require("mongoose");
const app = express();

// jobs
const deleteCancelledSubscriptions = require("./jobs/deleteCancelledSubscriptions");

// deleteCancelledSubscriptions.start();

app.use(helmet());
const database = config[config.env].database;
const db = mongoose.connection;

const port = process.env.PORT || "4000";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: "production",
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

  app.use(Sentry.Handlers.errorHandler());
}

app.use("/api/webhooks", require("./api/webhooks"));

app.use(cors());

app.use(
  express.json({
    limit: 30000000,
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

mongoose.connect(database, { useNewUrlParser: true });

app.use(morgan("combined"));

app.use("/api/auth", require("./api/auth"));
app.use("/api/user", require("./api/user"));
app.use("/api/posts", require("./api/posts"));
app.use("/api/tokens", require("./api/token"));
app.use("/api/contacts", require("./api/contact"));
app.use("/api/contacted", require("./api/contacted"));
app.use("/api/story", require("./api/story"));
app.use("/api/inbox", require("./api/inbox"));
app.use("/api/reading_list", require("./api/readingList"));
app.use("/api/tags", require("./api/tags"));
app.use("/api/search", require("./api/search"));
app.use("/api/website", require("./api/website"));
app.use("/api/submitted", require("./api/submitted"));
app.use("/api/subscriptions", require("./api/subscriptions"));
app.use("/api/stripe", require("./api/stripe"));
app.use("/api/upload", require("./api/upload"));
app.use("/api/announcements", require("./api/announcements"));

db.on("error", console.error.bind(console, "Connection error - Mongodb"));
db.once("open", () => console.log("Connected sucessfully to Mongo database"));

console.log("For Chris: biscuits");

app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.listen(port, () => console.log("App running on " + port));
