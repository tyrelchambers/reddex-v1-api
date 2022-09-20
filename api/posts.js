const express = require("express");
const filterByUpvotes = require("../libs/filterByUpvotes");
const filterByReadTime = require("../libs/filterByReadTime");
const filterBySeries = require("../libs/filterBySeriesOnly");
const filterByKeywords = require("../libs/filterByKeywords");
const visitorHandler = require("../middleware/visitorHandler");
const averageReadingTime = require("../libs/averageReadingTime");
const app = express.Router();
const authHandler = require("../middleware/authHandler");
const Post = require("../mongo/models/post");
const Sentry = require("@sentry/node");

app.delete(
  "/v1/delete",
  authHandler({ continueOnNoUser: true }),
  visitorHandler,
  async (req, res, next) => {
    try {
      const postOwner = res.locals.userId || res.locals.token;

      await Post.deleteMany({
        owner: postOwner,
      });

      res.sendStatus(200);
    } catch (err) {
          Sentry.captureException(error)

      next(err);
    }
  }
);

app.post(
  "/v1/save",
  authHandler({ continueOnNoUser: true }),
  visitorHandler,
  async (req, res, next) => {
    try {
      const { subreddit } = req.body;

      const postOwner = res.locals.userId || res.locals.token;

      const toInsert = req.body.posts.map((x) => ({
        author: x.author,
        title: x.title,
        self_text: x.self_text,
        ups: x.ups,
        url: x.url,
        num_comments: x.num_comments,
        created: x.created,
        flair: x.flair,
        post_id: x.post_id,
        subreddit: x.subreddit,
        upvote_ratio: x.upvote_ratio.toFixed(2),
      }));

      const posts = await Post.create({
        posts: toInsert,
        subreddit,
        owner: postOwner,
      });

      res.send(posts);
    } catch (error) {
                Sentry.captureException(error)

      next(error);
    }
  }
);

app.put(
  "/v1/used",
  authHandler({ continueOnNoUser: true }),
  visitorHandler,
  async (req, res, next) => {
    try {
      const { post_id } = req.body;

      const postOwner = await Post.findOne({
        where: { owner: res.locals.userId || res.locals.token },
      });

      const post = postOwner.posts.filter((p) => p.post_id === post_id);

      post.used = true;

      await postOwner.save();

      res.sendStatus(200);
    } catch (error) {
                Sentry.captureException(error)

      next(error);
    }
  }
);

app.get(
  "/v1/",
  authHandler({ continueOnNoUser: true }),
  visitorHandler,
  async (req, res, next) => {
    try {
      const { upvotes, keywords, misc, readTime } = req.query.filters
        ? { ...JSON.parse(req.query.filters) }
        : {};

      const { wpm } = req.query;

      let resLimit = 25;
      let page = req.query.page || 1;
      const limit = resLimit * page;
      const skip = resLimit * page - resLimit;
      let query = {};

      const postOwner = res.locals.userId || res.locals.token;

      if (upvotes) {
        if (upvotes.value > "0") {
          if (upvotes.operator === "over") {
            query.ups = {
              operator: ">=",
              value: Number(upvotes.value),
            };
          }

          if (upvotes.operator === "equal") {
            query.ups = {
              operator: "=",
              value: Number(upvotes.value),
            };
          }

          if (upvotes.operator === "under") {
            query.ups = {
              operator: "<=",
              value: Number(upvotes.value),
            };
          }
        }
      }

      if (readTime) {
        if (readTime.value > "0") {
          if (readTime.operator === "over") {
            query.readTime = {
              operator: ">=",
              value: Number(readTime.value),
            };
          }

          if (readTime.operator === "under") {
            query.readTime = {
              operator: "<=",
              value: Number(readTime.value),
            };
          }
        }
      }

      if (keywords) {
        query.keywords = keywords.value;
      }

      if (misc) {
        if (misc.value === "seriesOnly") {
          query.seriesOnly = true;
        }

        if (misc.value === "omitSeries") {
          query.omitSeries = true;
        }
      }
      const _owner = await Post.findOne({ owner: postOwner });

      const posts =
        _owner === null
          ? []
          : _owner.posts
              .filter((post) => filterByUpvotes({ post, query }))
              .filter((post) =>
                filterByReadTime({
                  post,
                  query,
                  wpm,
                })
              )
              .filter((post) => filterByKeywords({ post, query }))
              .filter((post) => filterBySeries({ post, query }));

      const maxPages =
        Math.round(posts.length / 25) === 0 ? 1 : Math.round(posts.length / 25);

      res.send({
        post: {
          subreddit: _owner?.subreddit,
          posts: posts.slice(skip, limit),
        },
        maxPages,
      });
    } catch (error) {
                Sentry.captureException(error)

      next(error);
    }
  }
);

module.exports = app;
