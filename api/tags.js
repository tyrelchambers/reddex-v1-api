const express = require("express");
const authHandler = require("../middleware/authHandler");
const db = require("../models");

const app = express.Router();

app.post("/v1/save", authHandler(), async (req, res, next) => {
  try {
    const { tag, stories } = req.body;

    const newTags = await db.Tag.create({
      tag: tag.tag,
      userId: res.locals.userId,
    });

    newTags.setStories(stories);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.delete("/v1/:id/delete", authHandler(), async (req, res, next) => {
  try {
    const { id } = req.params;

    await db.Tag.destroy({
      where: {
        uuid: id,
        userId: res.locals.userId,
      },
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.put("/v1/edit", authHandler(), async (req, res, next) => {
  try {
    const { tag, stories } = req.body;

    await db.Tag.update(
      {
        tag: tag.tag,
      },
      {
        where: {
          uuid: tag.uuid,
          userId: res.locals.userId,
        },
        returning: true,
        plain: true,
      }
    );

    const tagToAddStoryTo = await db.Tag.findOne({
      where: {
        uuid: tag.uuid,
        userId: res.locals.userId,
      },
    });

    tagToAddStoryTo.setStories(stories);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.get("/v1/:uuid", authHandler(), async (req, res, next) => {
  try {
    const { uuid } = req.params;

    const tag = await db.Tag.findOne({
      where: {
        uuid,
      },
      include: ["stories"],
    });

    res.send(tag);
  } catch (error) {
    next(error);
  }
});

app.get("/v1/", authHandler(), async (req, res, next) => {
  try {
    const tags = await db.Tag.findAll({
      where: {
        userId: res.locals.userId,
      },
      include: ["stories"],
    });

    res.send(tags);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
