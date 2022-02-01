const express = require("express");
const { Op } = require("sequelize/dist");
const authHandler = require("../middleware/authHandler");
const db = require("../models");
const app = express.Router();

app.get("/v1/", authHandler(), async (req, res, next) => {
  try {
    const { author, subject } = JSON.parse(req.query.data);

    const story = await db.Story.findOne({
      where: {
        author,
        title: {
          [Op.like]: `%${subject}%`,
        },
        user_id: res.locals.userId,
      },
    });

    if (!story) {
      return res.status(404).send({
        error: "Story not found",
      });
    }

    res.send(story);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
