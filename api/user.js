const { default: axios } = require("axios");
const express = require("express");
const authHandler = require("../middleware/authHandler");
const db = require("../models");
const app = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const sendEmail = require("../emails/sendEmail");
const { emailTemplates } = require("../constants");

app.get("/v1/me", authHandler(), async (req, res, next) => {
  try {
    const userId = res.locals.userId;

    const user = await db.User.findOne({
      where: {
        uuid: userId,
      },
      attributes: {
        exclude: ["password"],
      },
      include: [db.Profile, db.Searched],
    });

    res.send(user);
  } catch (error) {
    next(error);
  }
});

app.get("/v1/link-reddit", authHandler(), async (req, res, next) => {
  try {
    const { code } = req.query;

    const encode = Buffer.from(
      `${process.env.REDDIT_APP}:${process.env.REDDIT_SECRET}`
    ).toString("base64");

    const { refresh_token } = await axios
      .post(
        "https://www.reddit.com/api/v1/access_token",
        `grant_type=authorization_code&code=${code}&redirect_uri=${process.env.REDDIT_REDIRECT}`,

        {
          headers: {
            Authorization: `Basic ${encode}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        return res.data;
      });

    await db.User.update(
      {
        reddit_refresh_token: refresh_token,
      },
      {
        where: {
          uuid: res.locals.userId,
        },
      }
    );

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.get("/v1/reddit-profile", authHandler(), async (req, res, next) => {
  try {
    const { accessToken } = req.query;

    const redditProfile = await axios
      .get("https://oauth.reddit.com/api/v1/me", {
        headers: {
          Authorization: `bearer ${accessToken}`,
        },
      })
      .then((res) => res.data);

    await db.Profile.update(
      {
        reddit_profile: redditProfile,
      },
      {
        where: {
          userId: res.locals.userId,
        },
      }
    );

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.get("/v1/reddit-access-token", authHandler(), async (req, res, next) => {
  try {
    const encode = Buffer.from(
      `${process.env.REDDIT_APP}:${process.env.REDDIT_SECRET}`
    ).toString("base64");

    const user = await db.User.findOne({
      where: {
        uuid: res.locals.userId,
      },
    });

    const { access_token } = await axios
      .post(
        "https://www.reddit.com/api/v1/access_token",
        `grant_type=refresh_token&refresh_token=${user.reddit_refresh_token}`,
        {
          headers: {
            Authorization: `Basic ${encode}`,
          },
        }
      )
      .then((res) => res.data);

    res.send({ access_token });
  } catch (error) {
    next(error);
  }
});

app.put("/v1/update", authHandler(), async (req, res, next) => {
  try {
    const { greeting, recurring, words_per_minute } = { ...req.body };

    await db.Profile.update(
      {
        greeting,
        recurring,
        words_per_minute,
      },
      {
        where: {
          userId: res.locals.userId,
        },
      }
    );

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.get("/v1/confirm_email", async (req, res, next) => {
  try {
    const { emailToken } = req.query;

    const userId = await jwt.verify(
      emailToken,
      process.env.JWT_SECRET,
      async (err, decoded) => {
        if (decoded === "undefined" || !decoded || err) return false;
        let uuid = decoded.uuid;

        return uuid;
      }
    );

    if (!userId) throw new Error("Something went wrong");

    await db.User.update(
      {
        email_confirmed: true,
      },
      {
        where: {
          uuid: userId,
        },
        returning: true,
        plain: true,
      }
    );

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.post("/v1/change-password", authHandler(), async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (newPassword.length < 8)
      throw new Error("Password must be at least 8 characters");
    if (newPassword.length > 255)
      throw new Error("Password must be less than 255 characters");

    const user = await db.User.findOne({
      where: {
        uuid: res.locals.userId,
      },
    });

    const hashPassword = await bcrypt.compareSync(
      currentPassword,
      user.password
    );
    if (!hashPassword) return next({ error: "Incorrect password" });

    const hashNewPassword = await bcrypt.hashSync(newPassword, 10);

    await user.update({
      password: hashNewPassword,
    });

    sendEmail({
      to: user.email,
      subject: "Your password has been changed",
      template: emailTemplates.passwordChange,
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.post("/v1/change-email", authHandler(), async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) throw new Error("Email is required");

    const existingUser = await db.User.findOne({
      where: {
        email,
      },
    });

    if (existingUser) throw new Error("Email already exists");

    const user = await db.User.findOne({
      where: {
        uuid: res.locals.userId,
      },
    });

    await user.update({
      email,
    });

    sendEmail({
      to: user.email,
      subject: "Your email has been changed",
      template: emailTemplates.emailChange,
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
