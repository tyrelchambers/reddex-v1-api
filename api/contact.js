const express = require("express");
const authHandler = require("../middleware/authHandler");
const db = require("../models");

const app = express.Router();

app.post("/v1/save", authHandler(), async (req, res, next) => {
  try {
    const { name, notes } = req.body;

    await db.Contact.create({
      name,
      notes,
      userId: res.locals.userId,
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.delete("/v1/delete/:uuid", authHandler(), async (req, res, next) => {
  try {
    const { uuid } = req.params;
    await db.Contact.destroy({
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

app.put("/v1/:id/edit", authHandler(), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, notes } = req.body;

    await db.Contact.update(
      {
        name,
        notes,
      },
      {
        where: {
          uuid: id,
          userId: res.locals.userId,
        },
      }
    );

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.get("/v1/contact", authHandler(), async (req, res, next) => {
  try {
    const { username, uuid } = { ...req.query };
    const options = {};

    if (username) {
      options.name = username;
    }

    if (uuid) {
      options.uuid = uuid;
    }

    const contact = await db.Contact.findOne({
      where: {
        ...options,
        userId: res.locals.userId,
      },
    });

    res.send(contact);
  } catch (error) {
    next(error);
  }
});

app.get("/v1/", authHandler(), async (req, res, next) => {
  try {
    const contacts = await db.Contact.findAll({
      where: {
        userId: res.locals.userId,
      },
    });

    res.send(contacts);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
