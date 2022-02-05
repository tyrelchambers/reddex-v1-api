const express = require("express");
const { emailTemplates } = require("../constants");
const stripeData = require("../constants/stripeData");
const sendEmail = require("../emails/sendEmail");
const stripe = require("../libs/stripe");
const db = require("../models");

const app = express.Router();

app.post('/v1/storyblok', express.raw({type: 'application/json'}), async (req, res, next) => {
  try {
    console.log(req);
  } catch (error) {
    next(error)
  }
})

app.post(
  "/v1/",
  express.raw({ type: "application/json" }),
  async (req, res, next) => {
    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        req.headers["stripe-signature"],
        process.env.STRIPE_WEBHOOK_SECRET
      );

      if (event.type === "customer.updated") {
        await db.Subscription.update(
          {
            ...event.data.object,
          },
          {
            where: {
              include: {
                model: db.User,
                where: {
                  email: event.data.object.email,
                },
              },
            },
          }
        );
      }

      if (event.type === "customer.subscription.updated") {
        const product = await stripe.products.retrieve(
          event.data.object.plan.product
        );
        await db.Subscription.update(
          {
            subscriptionId: event.data.object.id,
            cancelOn: event.data.object.cancel_at,
            plan: product.name.toLowerCase(),
            term: event.data.object.plan.interval,
          },
          {
            where: {
              customerId: event.data.object.customer,
            },
          }
        );
      }

      if (event.type === "customer.subscription.trial_will_end") {
        const sub = await db.Subscription.findOne({
          where: {
            customerId: event.data.object.customer,
          },
          include: [db.User],
        });

        console.log("--- updating subscription ---");

        await stripe.subscriptions.update(sub.subscriptionId, {
          items: [
            {
              price: stripeData.products[sub.plan][sub.term],
            },
          ],
        });

        sendEmail({
          to: sub.User.email,
          subject: "Your trial will be ending soon",
          template: emailTemplates.trialEnding,
          dynamics: {
            host: process.env.FRONT_END,
            trialEndDate: sub.cancelOn,
          },
        });
      }

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = app;
