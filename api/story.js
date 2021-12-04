const express = require("express"***REMOVED***
const averageReadingTime = require("../libs/averageReadingTime"***REMOVED***
const authHandler = require("../middleware/authHandler"***REMOVED***
const db = require("../models"***REMOVED***

const app = express.Router(***REMOVED***

app.post("/v1/save", authHandler, async (req, res, next) => {
  try {
    const {
      author,
      flair,
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

    if (existingStory) throw new Error("Story already exists"***REMOVED***

    await db.Story.create({
      author,
      title,
      self_text,
      ups,
      url,
      num_comments,
      flair,
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

app.put("/v1/tag", authHandler, async (req, res, next) => {
  try {
    const { tags, storyId ***REMOVED*** = req.body.data;

    const tagIds = tags.map((tag) => tag.uuid***REMOVED***

    const story = await db.Story.findOne({
      where: {
        uuid: storyId,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    story.addTags(tagIds***REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.delete("/v1/delete", authHandler, async (req, res, next) => {
  try {
    const { uuid ***REMOVED*** = req.body;

    await db.Story.destroy({
      where: {
        uuid,
        user_id: res.locals.userId,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

module.exports = app;
