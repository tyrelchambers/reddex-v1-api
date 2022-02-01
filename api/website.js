const express = require("express");
const { emailTemplates } = require("../constants");
const sendEmail = require("../emails/sendEmail");
const authHandler = require("../middleware/authHandler");
const db = require("../models");

const app = express.Router();

app.put("/v1/update", authHandler(), async (req, res, next) => {
  try {
    let website = await db.Website.findOne({
      where: {
        userId: res.locals.userId,
      },
    });

    if (!website) {
      website = await db.Website.create({
        userId: res.locals.userId,
      });

      await db.User.update(
        {
          websiteId: website.uuid,
        },
        {
          where: {
            uuid: res.locals.userId,
          },
        }
      );
    }

    await website.update({ config: { ...req.body } });
    await website.save();

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.get("/v1/me", authHandler(), async (req, res, next) => {
  try {
    const website = await db.Website.findOne({
      where: {
        userId: res.locals.userId,
      },
    });

    res.send(website ? website : { config: {} });
  } catch (error) {
    next(error);
  }
});

app.get("/v1/checkSubdomain", async (req, res, next) => {
  try {
    const { subdomain } = req.query;

    const website = await db.Website.findOne({
      where: {
        config: {
          general: {
            domain: subdomain,
          },
        },
      },
    });

    if (website) {
      return res.send({ available: false });
    }

    res.send({ available: true });
  } catch (error) {
    next(error);
  }
});

app.post("/v1/submitStory", async (req, res, next) => {
  try {
    const { title, email, content, author, siteOwner } = req.body;

    if ((title || email || author).length > 255) {
      return res.status(400).send({ error: "Word limit exceeded" });
    }

    const user = await db.User.findOne({
      where: {
        uuid: siteOwner,
      },
    });

    await db.SubmittedStory.create({
      story_title: title,
      email,
      body: content,
      author,
      userId: siteOwner,
    });

    sendEmail({
      to: user.email,
      subject: "New Story Submission",
      template: emailTemplates.storySubmission,
      dynamics: {
        host: `${process.env.FRONT_END}`,
      },
    });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.get("/v1/:subdomain", async (req, res, next) => {
  try {
    const { subdomain } = req.params;
    const website = await db.Website.findOne({
      where: {
        config: {
          general: {
            domain: subdomain,
          },
        },
      },
      include: [
        {
          model: db.User,
          as: "user",
          include: [
            {
              model: db.Subscription,
              attributes: ["plan"],
            },
          ],
        },
      ],
    });

    if (website.user.Subscription.plan === "basic") {
      return res.sendStatus(404);
    }

    if (!website) {
      return res.sendStatus(404);
    }

    res.send(website);
  } catch (error) {
    next(error);
  }
});

app.delete("/v1/delete", authHandler(), async (req, res, next) => {
  try {
    const { uuid } = req.query;

    await db.Website.destroy({
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

module.exports = app;
