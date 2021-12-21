// express server listening on port 3000
const express = require("express"***REMOVED***
require("dotenv").config(***REMOVED***

const cors = require("cors"***REMOVED***
const helmet = require("helmet"***REMOVED***
const morgan = require("morgan"***REMOVED***
const config = require("./config"***REMOVED***
const mongoose = require("mongoose"***REMOVED***
const app = express(***REMOVED***

const auth = require("./api/auth"***REMOVED***
const user = require("./api/user"***REMOVED***
const posts = require("./api/posts"***REMOVED***
const tokens = require("./api/token"***REMOVED***
const contacts = require("./api/contact"***REMOVED***
const contacted = require("./api/contacted"***REMOVED***
const story = require("./api/story"***REMOVED***
const inbox = require("./api/inbox"***REMOVED***
const readingList = require("./api/readingList"***REMOVED***
const tags = require("./api/tags"***REMOVED***
const search = require("./api/search"***REMOVED***
const website = require("./api/website"***REMOVED***
const submitted = require("./api/submitted"***REMOVED***
const subscriptions = require("./api/subscriptions"***REMOVED***

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

app.use("/api/auth", auth***REMOVED***
app.use("/api/user", user***REMOVED***
app.use("/api/posts", posts***REMOVED***
app.use("/api/tokens", tokens***REMOVED***
app.use("/api/contacts", contacts***REMOVED***
app.use("/api/contacted", contacted***REMOVED***
app.use("/api/story", story***REMOVED***
app.use("/api/inbox", inbox***REMOVED***
app.use("/api/reading_list", readingList***REMOVED***
app.use("/api/tags", tags***REMOVED***
app.use("/api/search", search***REMOVED***
app.use("/api/website", website***REMOVED***
app.use("/api/submitted", submitted***REMOVED***
app.use("/api/subscriptions", subscriptions***REMOVED***
app.use("/api/stripe", require("./api/stripe")***REMOVED***

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
