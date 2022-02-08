// express server listening on port 3000
const express = require("express");
require("dotenv").config();

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

app.use(function (err, req, res, next) {
  console.log("--------error--------");
  console.error(err.message);
  console.log("--------error--------");

  res.status(500).send(err.message);
});

app.listen(port, () => console.log("App running on " + port));
