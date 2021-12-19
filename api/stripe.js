const express = require("express"***REMOVED***
const stripe = require("../libs/stripe"***REMOVED***
const authHandler = require("../middleware/authHandler"***REMOVED***
const db = require("../models"***REMOVED***

const app = express.Router(***REMOVED***

app.post("/createPortal", authHandler, async (req, res, next) => {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: "{{ CUSTOMER_ID ***REMOVED******REMOVED***",
      return_url: "http://localhost:3000/dashboard/settings/subscription",
    ***REMOVED******REMOVED***

    res.redirect(session.url***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

app.get("/v1/plan", authHandler, async (req, res, next) => {
  try {
    const subscription = await db.Subscription.findOne({
      where: {
        userId: res.locals.userId,
      ***REMOVED***,
    ***REMOVED******REMOVED***

    console.log(subscription***REMOVED***

    res.send(subscription***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

module.exports = app;
