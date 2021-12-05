const express = require("express"***REMOVED***
const { Op ***REMOVED*** = require("sequelize/dist"***REMOVED***
const authHandler = require("../middleware/authHandler"***REMOVED***
const db = require("../models"***REMOVED***
const app = express.Router(***REMOVED***

app.get("/v1/", authHandler, async (req, res, next) => {
  try {
    const { author, subject ***REMOVED*** = JSON.parse(req.query.data***REMOVED***

    const story = await db.Story.findOne({
      where: {
        author,
        title: {
          [Op.like]: `%${subject***REMOVED***%`,
        ***REMOVED***,
        user_id: res.locals.userId,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    if (!story) {
      return res.status(404).send({
        error: "Story not found",
      ***REMOVED******REMOVED***
    ***REMOVED***

    res.send(story***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

module.exports = app;
