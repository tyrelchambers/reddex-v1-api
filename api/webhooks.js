const express = require("express"***REMOVED***
const stripe = require("../libs/stripe"***REMOVED***
const db = require("../models"***REMOVED***

const app = express.Router(***REMOVED***

app.post(
  "/v1/",
  express.raw({ type: "application/json" ***REMOVED***),
  async (req, res, next) => {
    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        req.headers["stripe-signature"],
        process.env.STRIPE_WEBHOOK_SECRET
      ***REMOVED***

      if (event.type === "customer.subscription.updated") {
        await db.Subscription.update(
          {
            subscriptionId: event.data.object.id,
            cancelOn: event.data.object.cancel_at,
          ***REMOVED***,
          {
            where: {
              customerId: event.data.object.customer,
            ***REMOVED***,
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***

      res.sendStatus(200***REMOVED***
    ***REMOVED*** catch (error) {
      next(error***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***

module.exports = app;
