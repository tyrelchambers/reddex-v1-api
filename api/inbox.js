const express = require("express"***REMOVED***
const authHandler = require("../middleware/authHandler"***REMOVED***

const app = express.Router(***REMOVED***

app.get("/v1/:id", authHandler, async (req, res, next) => {
  try {
    console.log(req.params***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

module.exports = app;
