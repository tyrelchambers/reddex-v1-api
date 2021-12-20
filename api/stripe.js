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

module.exports = app;
