// express server listening on port 3000
const express = require("express"***REMOVED***
require("dotenv").config(***REMOVED***

const cors = require("cors"***REMOVED***
const helmet = require("helmet"***REMOVED***
const morgan = require("morgan"***REMOVED***
const expressSanitizer = require("express-sanitizer"***REMOVED***
const config = require("./config"***REMOVED***
const mongoose = require("mongoose"***REMOVED***

const app = express(***REMOVED***
const database = config[config.env].database;
const db = mongoose.connection;

app.use(helmet()***REMOVED***

const port = process.env.PORT || "4000";
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
app.use(expressSanitizer()***REMOVED***
app.use(cors()***REMOVED***
app.use(morgan("combined")***REMOVED***
mongoose.connect(database, { useNewUrlParser: true ***REMOVED******REMOVED***

db.on("error", console.error.bind(console, "Connection error - Mongodb")***REMOVED***
db.once("open", () => console.log("Connected sucessfully to Mongo database")***REMOVED***

app.use(function (err, req, res) {
  console.error(err.message***REMOVED***
  res.status(500).send(err.message***REMOVED***
***REMOVED******REMOVED***

app.listen(port, () => console.log("App running on " + port)***REMOVED***
