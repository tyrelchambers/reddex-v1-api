const express = require("express");
const authHandler = require("../middleware/authHandler");
const db = require("../models");

const app = express.Router();

app.get("/v1/:uuid", authHandler(), async (req, res, next) => {
  try {
    const { uuid } = req.params;

    const story = await db.SubmittedStory.findOne({
      where: {
        uuid,
        userId: res.locals.userId,
      },
    });

    res.send(story);
  } catch (error) {
    next(error);
  }
});

app.delete("/v1/", authHandler(), async (req, res, next) => {
  try {
    const { uuid } = req.query;

    await db.SubmittedStory.destroy({
      where: {
        uuid,
        userId: res.locals.userId,
      },
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.get("/v1/", authHandler(), async (req, res, next) => {
  try {
    const submittedStories = await db.SubmittedStory.findAll({
      where: {
        userId: res.locals.userId,
      },
    });

    res.send(submittedStories);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
