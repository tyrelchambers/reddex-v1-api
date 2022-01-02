// express server listening on port 3000
const express = require("express"***REMOVED***
require("dotenv").config(***REMOVED***

const cors = require("cors"***REMOVED***
const helmet = require("helmet"***REMOVED***
const morgan = require("morgan"***REMOVED***
const config = require("./config"***REMOVED***
const mongoose = require("mongoose"***REMOVED***
const app = express(***REMOVED***

// jobs
const deleteCancelledSubscriptions = require("./jobs/deleteCancelledSubscriptions"***REMOVED***

deleteCancelledSubscriptions.start(***REMOVED***

app.use(helmet()***REMOVED***
const database = config[config.env].database;
const db = mongoose.connection;

const port = process.env.PORT || "4000";

app.use("/api/webhooks", require("./api/webhooks")***REMOVED***

app.use(cors()***REMOVED***

app.use(
  express.json({
    limit: 30000000,
  ***REMOVED***)
***REMOVED***

app.use(
  express.urlencoded({
    extended: true,
  ***REMOVED***)
***REMOVED***

mongoose.connect(database, { useNewUrlParser: true ***REMOVED******REMOVED***

app.use(morgan("combined")***REMOVED***

app.use("/api/auth", require("./api/auth")***REMOVED***
app.use("/api/user", require("./api/user")***REMOVED***
app.use("/api/posts", require("./api/posts")***REMOVED***
app.use("/api/tokens", require("./api/token")***REMOVED***
app.use("/api/contacts", require("./api/contact")***REMOVED***
app.use("/api/contacted", require("./api/contacted")***REMOVED***
app.use("/api/story", require("./api/story")***REMOVED***
app.use("/api/inbox", require("./api/inbox")***REMOVED***
app.use("/api/reading_list", require("./api/readingList")***REMOVED***
app.use("/api/tags", require("./api/tags")***REMOVED***
app.use("/api/search", require("./api/search")***REMOVED***
app.use("/api/website", require("./api/website")***REMOVED***
app.use("/api/submitted", require("./api/submitted")***REMOVED***
app.use("/api/subscriptions", require("./api/subscriptions")***REMOVED***
app.use("/api/stripe", require("./api/stripe")***REMOVED***
app.use("/api/upload", require("./api/upload")***REMOVED***

db.on("error", console.error.bind(console, "Connection error - Mongodb")***REMOVED***
db.once("open", () => console.log("Connected sucessfully to Mongo database")***REMOVED***

console.log("For Chris: biscuits"***REMOVED***

app.use(function (err, req, res, next) {
  console.log("--------error--------"***REMOVED***
  console.error(err.message***REMOVED***
  console.log("--------error--------"***REMOVED***

  res.status(500).send(err.message***REMOVED***
***REMOVED******REMOVED***

app.listen(port, () => console.log("App running on " + port)***REMOVED***
