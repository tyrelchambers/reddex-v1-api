const express = require("express"***REMOVED***
const authHandler = require("../middleware/authHandler"***REMOVED***
const db = require("../models"***REMOVED***

const app = express.Router(***REMOVED***

app.delete("/v1/", authHandler, async (req, res, next) => {
  try {
=    const { uuid ***REMOVED*** = req.query;

    await db.SubmittedStory.destroy({
      where: {
        uuid,
        userId: res.locals.userId,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.get("/v1/", authHandler, async (req, res, next) => {
  try {
    const submittedStories = await db.SubmittedStory.findAll({
      where: {
        userId: res.locals.userId,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    res.send(submittedStories***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

module.exports = app;
