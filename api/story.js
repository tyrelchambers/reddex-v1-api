const express = require("express"***REMOVED***
const averageReadingTime = require("../libs/averageReadingTime"***REMOVED***
const authHandler = require("../middleware/authHandler"***REMOVED***
const db = require("../models"***REMOVED***

const app = express.Router(***REMOVED***

app.post("/v1/save", authHandler, async (req, res, next) => {
  try {
    const {
      author,
      link_flair_text,
      num_comments,
      post_id,
      self_text,
      title,
      ups,
      url,
      subreddit,
      permission,
      created,
      upvote_ratio,
    ***REMOVED*** = req.body;

    const existingStory = await db.Story.findOne({
      where: {
        author,
        title,
        post_id,
        user_id: res.locals.userId,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    const psqlOwner = await db.User.findOne({
      where: {
        uuid: res.locals.userId,
      ***REMOVED***,
      include: [db.Profile],
    ***REMOVED******REMOVED***

    if (existingStory) throw new Error("Story already exists"***REMOVED***

    await db.Story.create({
      author,
      title,
      self_text,
      ups,
      url,
      num_comments,
      flair: link_flair_text,
      post_id,
      permission,
      subreddit,
      user_id: res.locals.userId,
      created,
      upvote_ratio: upvote_ratio.toFixed(2),
    ***REMOVED******REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

module.exports = app;
