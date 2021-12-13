const express = require("express"***REMOVED***

const app = express.Router(***REMOVED***

app.post("/createPortal", authHandler, async (req, res, next) => {
  try {
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

module.exports = app;
