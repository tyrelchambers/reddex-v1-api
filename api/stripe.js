const express = require("express");
const stripe = require("../libs/stripe");
const authHandler = require("../middleware/authHandler");
const db = require("../models");

const app = express.Router();

app.post("/v1/create-portal", authHandler(), async (req, res, next) => {
  try {
    const { customerId } = req.body;
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: "http://localhost:3000/dashboard/settings/subscription",
    });

    res.send(session.url);
  } catch (error) {
    next(error);
  }
});

app.get("/v1/plan", authHandler(), async (req, res, next) => {
  try {
    const sub = await db.Subscription.findOne({
      where: {
        userId: res.locals.userId,
      },
      attributes: ["customerId", "subscriptionId"],
    });

    const subscription = await stripe.subscriptions.retrieve(
      sub.subscriptionId
    );

    const product = await stripe.products.retrieve(subscription.plan.product);

    res.send({ subscription, product });
  } catch (error) {
    next(error);
  }
});

module.exports = app;
