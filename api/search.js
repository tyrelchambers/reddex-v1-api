const express = require("express");
const authHandler = require("../middleware/authHandler");
const db = require("../models");

const app = express.Router();

app.post("/v1/save", authHandler(), async (req, res, next) => {
  try {
    const { subreddit } = req.body.data;

    const existingSearched = await db.Searched.findOne({
      where: {
        subreddit,
        userId: res.locals.userId,
      },
    });

    if (existingSearched || !subreddit) return res.sendStatus(200);

    await db.Searched.create({
      subreddit,
      userId: res.locals.userId,
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.delete("/v1/", authHandler(), async (req, res, next) => {
  try {
    const { id, subreddit } = req.query;

    await db.Searched.destroy({
      where: {
        id,
        userId: res.locals.userId,
        subreddit,
      },
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.get("/v1/", authHandler(), async (req, res, next) => {
  try {
    const searches = await db.Searched.findAll({
      where: {
        userId: res.locals.userId,
      },
    });

    res.send(searches);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
