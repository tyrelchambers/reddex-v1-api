const mongoose = require("mongoose"***REMOVED***

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    subreddit: String,
    visitor_token: String,

    posts: [
      {
        author: String,
        title: String,
        self_text: String,
        ups: Number,
        url: String,
        num_comments: Number,
        created: Number,
        flair: String,
        post_id: String,
        subreddit: String,
        upvote_ratio: Number,
        viewed: {
          type: Boolean,
          default: false,
        ***REMOVED***,
        used: {
          type: Boolean,
          default: false,
        ***REMOVED***,
        page: Number,
        readTime: Number,
      ***REMOVED***,
    ],
  ***REMOVED***,
  { timestamps: { createdAt: "created_at" ***REMOVED*** ***REMOVED***
***REMOVED***

postSchema.index(
  {
    title: "text",
    self_text: "text",
    author: "text",
  ***REMOVED***,
  {
    weights: {
      self_text: 15,
      title: 7,
    ***REMOVED***,
  ***REMOVED***
***REMOVED***
const Post = mongoose.model("Post", postSchema***REMOVED***
module.exports = Post;
