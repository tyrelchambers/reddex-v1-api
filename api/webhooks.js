const express = require("express"***REMOVED***
const { emailTemplates ***REMOVED*** = require("../constants"***REMOVED***
const stripeData = require("../constants/stripeData"***REMOVED***
const sendEmail = require("../emails/sendEmail"***REMOVED***
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
        const product = await stripe.products.retrieve(
          event.data.object.plan.product
        ***REMOVED***

        await db.Subscription.update(
          {
            subscriptionId: event.data.object.id,
            cancelOn: event.data.object.cancel_at,
            plan: product.name.toLowerCase(),
            term: event.data.object.plan.interval,
          ***REMOVED***,
          {
            where: {
              customerId: event.data.object.customer,
            ***REMOVED***,
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***

      if (event.type === "customer.subscription.trial_will_end") {
        const sub = await db.Subscription.findOne({
          where: {
            customerId: event.data.object.customer,
          ***REMOVED***,
          include: [db.User],
        ***REMOVED******REMOVED***

        console.log("--- updating subscription ---"***REMOVED***

        await stripe.subscriptions.update(sub.subscriptionId, {
          items: [
            {
              price: stripeData.products[sub.plan][sub.term],
            ***REMOVED***,
          ],
        ***REMOVED******REMOVED***

        sendEmail({
          to: sub.User.email,
          subject: "Your trial will be ending soon",
          template: emailTemplates.trialEnding,
          dynamics: {
            host: process.env.FRONT_END,
            trialEndDate: sub.cancelOn,
          ***REMOVED***,
        ***REMOVED******REMOVED***
      ***REMOVED***

      res.sendStatus(200***REMOVED***
    ***REMOVED*** catch (error) {
      next(error***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***

module.exports = app;