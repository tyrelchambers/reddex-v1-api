const express = require("express"***REMOVED***
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
    ***REMOVED*** = req.body;

    const existingStory = await db.Story.findOne({
      where: {
        author,
        title,
        post_id,
        user_id: res.locals.userId,
      ***REMOVED***,
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
    ***REMOVED******REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

module.exports = app;
