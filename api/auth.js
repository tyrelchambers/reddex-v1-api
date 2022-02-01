const express = require("express");
const signToken = require("../libs/signToken");
const db = require("../models");
const bcrypt = require("bcryptjs");
const app = express.Router();
const sendEmail = require("../emails/sendEmail");
const stripe = require("../libs/stripe");
const { addWeeks } = require("date-fns");
const stripeData = require("../constants/stripeData");
const addUserToSendGridContact = require("../libs/addUserToSendGridContact");
const { emailTemplates } = require("../constants");
const decodeToken = require("../libs/decodeToken");

app.get("/v1/login", async (req, res, next) => {
  try {
    const { email, password } = req.query;

    const user = await db.User.findOne({
      where: {
        email,
      },
      include: [db.Profile],
    });

    if (!user) throw new Error("User not found");

    const hashPassword = await bcrypt.compareSync(password, user.password);
    if (!hashPassword) throw new Error("Password is incorrect");

    const token = await signToken(user.uuid, "4w");

    if (!user.email_confirmed) {
      sendEmail({
        to: user.email,
        subject: "Confirm your email",
        template: emailTemplates.confirmEmail,
        dynamics: {
          redirect_url: process.env.FRONT_END,
          token,
        },
      });
    }

    res.send({ user, token });
  } catch (error) {
    next(error);
  }
});

app.post("/v1/register", async (req, res, next) => {
  try {
    const { email, password, plan, term } = req.body;

    if (!(email || password)) throw new Error("Email or password are missing");
    if (!(plan || term)) throw new Error("Plan or term are missing");

    if (password.length < 8)
      throw new Error("Password must be at least 8 characters");
    if (password.length > 255)
      throw new Error("Password must be less than 255 characters");

    const existingUser = await db.User.findOne({
      where: {
        email,
      },
      include: [db.Profile],
    });

    if (existingUser) throw new Error("User already exists");

    const hashPassword = bcrypt.hashSync(password, 10);

    const user = await db.User.create({
      email,
      password: hashPassword,
    });

    await db.Profile.create({
      userId: user.uuid,
    });

    const customer = await stripe.customers.create({
      email,
    });

    // start customer on pro monthly trial
    const sub = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: stripeData.products.pro.year,
        },
      ],
      trial_end: addWeeks(new Date(Date.now()), 1),
    });

    await db.Subscription.create({
      customerId: customer.id,
      subscriptionId: sub.id,
      userId: user.uuid,
      plan,
      term,
    });

    const token = await signToken(user.uuid, "1m");

    sendEmail({
      to: user.email,
      subject: "Confirm your email",
      template: emailTemplates.confirmEmail,
      dynamics: {
        redirect_url: process.env.FRONT_END,
        token,
      },
    });

    addUserToSendGridContact(user);

    res.send({ user, token });
  } catch (error) {
    next(error);
  }
});

app.post("/v1/forgot-password", async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await db.User.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new Error("User not found");

    const token = await signToken(user.uuid, "1m");

    sendEmail({
      to: user.email,
      subject: "Reset your password",
      template: emailTemplates.forgotPassword,
      dynamics: {
        redirect_url: `${process.env.FRONT_END}/reset-password?token=${token}`,
      },
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.post("/v1/reset-password", async (req, res, next) => {
  try {
    const { newPassword: password, token } = req.body;

    if (password.length < 8)
      throw new Error("Password must be at least 8 characters");
    if (password.length > 255)
      throw new Error("Password must be less than 255 characters");

    const userId = await decodeToken(token);

    const user = await db.User.findOne({
      where: {
        uuid: userId,
      },
    });

    if (!user) throw new Error("User not found");

    const hashPassword = bcrypt.hashSync(password, 10);

    user.password = hashPassword;

    await user.save();

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
