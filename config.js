require("dotenv").config(***REMOVED***

module.exports = {
  development: {
    secret: "my furry cat house",
    database: "mongodb://mongodb/reddex",
  ***REMOVED***,
  production: {
    secret: "my furry cat house",
    database: "mongodb://mongodb/reddex",
  ***REMOVED***,

  env: process.env.NODE_ENV || "development",
***REMOVED***;
