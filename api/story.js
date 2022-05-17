const express = require("express");
const averageReadingTime = require("../libs/averageReadingTime");
const authHandler = require("../middleware/authHandler");
const db = require("../models");

const app = express.Router();

app.post("/v1/save", authHandler(), async (req, res, next) => {
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
    } = req.body;

    const existingStory = await db.Story.findOne({
      where: {
        author,
        title,
        post_id,
        user_id: res.locals.userId,
      },
    });

    if (!existingStory) {
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
      });
    }

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.put("/v1/tag", authHandler(), async (req, res, next) => {
  try {
    const { tags, storyId } = req.body.data;

    const tagIds = tags.map((tag) => tag.uuid);

    const story = await db.Story.findOne({
      where: {
        uuid: storyId,
      },
    });

    story.addTags(tagIds);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.post("/v1/delete", authHandler(), async (req, res, next) => {
  try {
    const { uuid } = req.body;
    await db.Story.update(
      {
        read: false,
        permission: false,
      },
      {
        where: {
          uuid,
          user_id: res.locals.userId,
        },
      }
    );

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.get("/v1/story", authHandler(), async (req, res, next) => {
  try {
    const { title } = { ...req.query };

    const options = {};

    if (title) {
      options.title = title;
    }

    const story = await db.Story.findOne({
      where: {
        ...options,
        user_id: res.locals.userId,
      },
    });

    res.send(story);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
