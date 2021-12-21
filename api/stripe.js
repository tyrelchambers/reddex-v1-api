const express = require("express"***REMOVED***
const stripe = require("../libs/stripe"***REMOVED***
const authHandler = require("../middleware/authHandler"***REMOVED***
const db = require("../models"***REMOVED***

const app = express.Router(***REMOVED***

app.post("/v1/create-portal", authHandler, async (req, res, next) => {
  try {
    const { customerId ***REMOVED*** = req.body;
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: "http://localhost:3000/dashboard/settings/subscription",
    ***REMOVED******REMOVED***

    res.send(session.url***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.get("/v1/plan", authHandler, async (req, res, next) => {
  try {
    const sub = await db.Subscription.findOne({
      where: {
        userId: res.locals.userId,
      ***REMOVED***,
      attributes: ["customerId", "subscriptionId"],
    ***REMOVED******REMOVED***

    const subscription = await stripe.subscriptions.retrieve(
      sub.subscriptionId
    ***REMOVED***
    const product = await stripe.products.retrieve(subscription.plan.product***REMOVED***

    res.send({ subscription, product ***REMOVED******REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.post(
  "/v1/webhooks",
  express.raw({ type: "application/json" ***REMOVED***),
  async (req, res, next) => {
    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        req.headers["stripe-signature"],
        process.env.STRIPE_WEBHOOK_SECRET
      ***REMOVED***

      if (event.type === "customer.subscription.deleted") {
        await db.Subscription.findOne({
          where: {
            customerId: event.data.object.customer,
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
