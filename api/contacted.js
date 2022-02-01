const express = require("express");
const authHandler = require("../middleware/authHandler");
const db = require("../models");

const app = express.Router();

app.post("/v1/save", authHandler(), async (req, res, next) => {
  try {
    const { name } = req.body;

    await db.Contacted.create({
      name,
      userId: res.locals.userId,
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.get("/v1/", authHandler(), async (req, res, next) => {
  try {
    const contacteds = await db.Contacted.findAll({
      where: {
        userId: res.locals.userId,
      },
    });

    res.send(contacteds);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
