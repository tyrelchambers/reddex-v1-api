const express = require("express"***REMOVED***
const Post = require('../mongo/models/post'***REMOVED***
const filterByUpvotes = require("../libs/filterByUpvotes"***REMOVED***
const filterByReadTime = require("../libs/filterByReadTime"***REMOVED***
const filterBySeries = require("../libs/filterBySeriesOnly"***REMOVED***
const filterByKeywords = require("../libs/filterByKeywords"***REMOVED***
const visitorHandler = require("../middleware/visitorHandler"***REMOVED***
const app = express.Router(***REMOVED***

app.delete("/v1/delete", visitorHandler, async (req, res, next) => {
  try {
    await Post.deleteMany({
      visitor_token: res.locals.postToken,
    ***REMOVED******REMOVED***

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (err) {
    next(err***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.post("/v1/save", visitorHandler, async (req, res, next) => {
  try {
    const {subreddit***REMOVED*** = req.body
    
    console.log(req.body***REMOVED***

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
    ***REMOVED***)***REMOVED***


    const posts = await Post.create({posts: toInsert, subreddit, visitor_token: res.locals.postToken***REMOVED******REMOVED***

    res.send(posts***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.get("/v1/", visitorHandler, async (req, res, next) => {
  try {
    const {
      operator,
      upvotes,
      keywords,
      seriesOnly,
      omitSeries,
      readTime,
      readTimeOperator,
    ***REMOVED*** = req.query;

    console.log(req.query***REMOVED***
    
    let resLimit = 25;
    let page = req.query.page || 1;
    const limit = resLimit * page;
    const skip = resLimit * page - resLimit;
    let query = {***REMOVED***;

    if (upvotes > '0') {
      if (operator === "over") {
        query.ups = {
          operator: "gte",
          value: Number(upvotes),
        ***REMOVED***;
      ***REMOVED***

      if (operator === "equal") {
        query.ups = {
          operator: "eq",
          value: Number(upvotes),
        ***REMOVED***;
      ***REMOVED***

      if (operator === "under") {
        query.ups = {
          operator: "lte",
          value: Number(upvotes),
        ***REMOVED***;
      ***REMOVED***
    ***REMOVED***

    console.log(readTime***REMOVED***

    if (readTime > '0') {      
      if (readTimeOperator === "over") {
        query.readTime = {
          operator: "gte",
          value: Number(readTime),
        ***REMOVED***;
      ***REMOVED***

      if (readTimeOperator === "under") {
        query.readTime = {
          operator: "lte",
          value: Number(readTime),
        ***REMOVED***;
      ***REMOVED***
    ***REMOVED***

    if (keywords) {
      query.keywords = `${keywords***REMOVED***`;
    ***REMOVED***

    if (seriesOnly === 'true') {
      query.seriesOnly = true;
    ***REMOVED***

    if (omitSeries === 'true') {
      query.omitSeries = true
    ***REMOVED***

    const postOwner = await Post.findOne({visitor_token: res.locals.postToken***REMOVED***)
    console.log(query***REMOVED***
    const posts = postOwner === null ? [] : postOwner.posts
                    .filter(post => filterByUpvotes({post, query***REMOVED***))
                    .filter(post => filterByReadTime({post, query***REMOVED***))
                    .filter(post => filterByKeywords({post, query***REMOVED***))
                    .filter(post => filterBySeries({post, query***REMOVED***))

                console.log(posts.length***REMOVED***
                    
    res.send({
      post: {
        subreddit: postOwner?.subreddit,
        posts: posts.slice(skip, limit)
      ***REMOVED***,
      maxPages: postOwner ? Math.round(posts.length / 25) : 0,
    ***REMOVED******REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.put("/v1/update", visitorHandler, async (req, res, next) => {
  try {
    const { post_id ***REMOVED*** = req.body;
  
    const postOwner = await Post.findOne({
      visitor_token: res.locals.postToken
    ***REMOVED***)

    const post = postOwner.posts.filter(p => p.post_id === post_id)[0]

    post.viewed = true

    await postOwner.save()

    res.sendStatus(200***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

module.exports = app;