const express = require("express"***REMOVED***
const authHandler = require("../middleware/authHandler"***REMOVED***
const app = express.Router(***REMOVED***
const db = require("../models/index"***REMOVED***

app.get("/v1/me", authHandler, async (req, res, next) => {
  try {
    const subscription = await db.Subscription.findOne({
      where: {
        userId: res.locals.userId,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    res.send({ subscription ***REMOVED******REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

module.exports = app;
