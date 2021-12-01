const express = require("express"***REMOVED***
const Post = require("../mongo/models/post"***REMOVED***
const filterByUpvotes = require("../libs/filterByUpvotes"***REMOVED***
const filterByReadTime = require("../libs/filterByReadTime"***REMOVED***
const filterBySeries = require("../libs/filterBySeriesOnly"***REMOVED***
const filterByKeywords = require("../libs/filterByKeywords"***REMOVED***
const visitorHandler = require("../middleware/visitorHandler"***REMOVED***
const averageReadingTime = require("../libs/averageReadingTime"***REMOVED***
const app = express.Router(***REMOVED***
const authHandler = require("../middleware/authHandler"***REMOVED***
const db = require("../models/index"***REMOVED***
const { Op ***REMOVED*** = require("sequelize"***REMOVED***

app.delete(
  "/v1/delete",
  authHandler,
  visitorHandler,
  async (req, res, next) => {
    try {
      const postOwner = res.locals.userId || res.locals.postToken;

      await db.Post.destroy({
        where: {
          owner: postOwner,
        ***REMOVED***,
      ***REMOVED******REMOVED***

      res.sendStatus(200***REMOVED***
    ***REMOVED*** catch (err) {
      next(err***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***

app.post("/v1/save", authHandler, visitorHandler, async (req, res, next) => {
  try {
    const { subreddit ***REMOVED*** = req.body;

    const psqlOwner = await db.User.findOne({
      where: {
        uuid: res.locals.userId,
      ***REMOVED***,
      include: [db.Profile],
    ***REMOVED******REMOVED***

    const userWpm = psqlOwner ? psqlOwner.Profile.words_per_minute : null;
    const postOwner = res.locals.userId || res.locals.postToken;

    const toInsert = req.body.posts.map((x) => ({
      author: x.author,
      title: x.title,
      self_text: x.self_text,
      ups: x.ups,
      url: x.url,
      num_comments: x.num_comments,
      created: x.created,
      link_flair_text: x.link_flair_text,
      post_id: x.post_id,
      subreddit: x.subreddit,
      upvote_ratio: x.upvote_ratio.toFixed(2),
      reading_time: averageReadingTime(x.self_text, userWpm),
    ***REMOVED***)***REMOVED***

    const posts = await db.Post.create({
      posts: toInsert,
      subreddit,
      owner: postOwner,
    ***REMOVED******REMOVED***

    res.send(posts***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.get("/v1/", authHandler, visitorHandler, async (req, res, next) => {
  try {
    const { upvotes, keywords, misc, readTime ***REMOVED*** = req.query.filters
      ? { ...JSON.parse(req.query.filters) ***REMOVED***
      : {***REMOVED***;

    let resLimit = 25;
    let page = req.query.page || 1;
    const limit = resLimit * page;
    const skip = resLimit * page - resLimit;
    let query = {***REMOVED***;
    const postOwner = res.locals.userId || res.locals.postToken;

    if (upvotes) {
      if (upvotes.value > "0") {
        if (upvotes.operator === "over") {
          query.ups = {
            [Op.gte]: Number(upvotes.value),
          ***REMOVED***;
        ***REMOVED***

        if (upvotes.operator === "equal") {
          query.ups = {
            [Op.eq]: Number(upvotes.value),
          ***REMOVED***;
        ***REMOVED***

        if (upvotes.operator === "under") {
          query.ups = {
            [Op.lte]: Number(upvotes.value),
          ***REMOVED***;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***

    if (readTime) {
      if (readTime.value > "0") {
        if (readTime.operator === "over") {
          query.readTime = {
            [Op.gte]: Number(readTime.value),
          ***REMOVED***;
        ***REMOVED***

        if (readTime.operator === "under") {
          query.readTime = {
            [Op.lte]: Number(readTime.value),
          ***REMOVED***;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***

    if (keywords) {
      query.keywords = {
        [Op.contains]: keywords,
      ***REMOVED***;
    ***REMOVED***

    if (misc) {
      if (misc.value === "seriesOnly") {
        query.link_flair_text = {
          [Op.eq]: "Series",
        ***REMOVED***;
      ***REMOVED***

      if (misc.value === "excludeSeries") {
        query.link_flair_text = {
          [Op.not]: "Series",
        ***REMOVED***;
      ***REMOVED***
    ***REMOVED***

    const _owner = await db.Post.findOne({
      where: {
        owner: postOwner,
        posts: {
          ...query,
        ***REMOVED***,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    // const posts =
    //   _owner === null
    //     ? []
    //     : _owner.posts
    //         .filter((post) => filterByUpvotes({ post, query ***REMOVED***))
    //         .filter((post) => filterByReadTime({ post, query ***REMOVED***))
    //         .filter((post) => filterByKeywords({ post, query ***REMOVED***))
    //         .filter((post) => filterBySeries({ post, query ***REMOVED***)***REMOVED***

    res.send({
      post: {
        subreddit: _owner?.subreddit,
        posts: _owner.posts.slice(skip, limit),
      ***REMOVED***,
      maxPages: _owner ? Math.round(_owner.posts.length / 25) : 0,
    ***REMOVED******REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.put("/v1/update", visitorHandler, async (req, res, next) => {
  try {
    const { post_id ***REMOVED*** = req.body;

    const postOwner = await db.Post.findOne({
      where: { owner: res.locals.postToken ***REMOVED***,
    ***REMOVED******REMOVED***

    const post = postOwner.posts.filter((p) => p.post_id === post_id)[0];

    post.viewed = true;

    await postOwner.save(***REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

module.exports = app;
