const express = require("express");
const { Op } = require("sequelize");
const authHandler = require("../middleware/authHandler");
const db = require("../models");

const app = express.Router();

app.get("/v1/approved", authHandler(), async (req, res, next) => {
  try {
    const stories = await db.Story.findAll({
      where: {
        user_id: res.locals.userId,
        permission: true,
        read: false,
      },
    });

    res.send(stories);
  } catch (error) {
    next(error);
  }
});

app.get("/v1/completed", authHandler(), async (req, res, next) => {
  try {
    const stories = await db.Story.findAll({
      where: {
        user_id: res.locals.userId,
        read: true,
      },
    });

    res.send(stories);
  } catch (error) {
    next(error);
  }
});

app.post("/v1/approved/save", authHandler(), async (req, res, next) => {
  try {
    const { subject, dest } = req.body;

    const story = await db.Story.findOne({
      where: {
        user_id: res.locals.userId,
        title: {
          [Op.substring]: `${subject.substring(0, subject.length - 3)}`,
        },
        author: dest,
      },
    });

    if (!story) throw new Error("Story not found");

    await story.update({
      permission: true,
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.put("/v1/transfer/to_completed", authHandler(), async (req, res, next) => {
  try {
    const { uuid } = req.body.data;

    const story = await db.Story.findOne({
      where: {
        uuid,
        user_id: res.locals.userId,
      },
    });

    if (!story) throw new Error("Story not found");

    await story.update({
      read: true,
      permission: false,
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.put("/v1/transfer/to_approved", authHandler(), async (req, res, next) => {
  try {
    const { uuid } = req.body.data;

    const story = await db.Story.findOne({
      where: {
        uuid,
        user_id: res.locals.userId,
      },
    });

    if (!story) throw new Error("Story not found");

    await story.update({
      read: false,
      permission: true,
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
