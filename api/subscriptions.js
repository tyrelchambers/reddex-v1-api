const express = require("express");
const authHandler = require("../middleware/authHandler");
const app = express.Router();
const db = require("../models/index");

app.get("/v1/me", authHandler(), async (req, res, next) => {
  try {
    const subscription = await db.Subscription.findOne({
      where: {
        userId: res.locals.userId,
      },
    });

    res.send({ subscription });
  } catch (error) {
    next(error);
  }
});

module.exports = app;
