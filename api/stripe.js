require("dotenv").config(***REMOVED***
const express = require("express"***REMOVED***
const stripe = require("stripe")(process.env.STRIPE_TEST_KEY***REMOVED***

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

module.exports = app;
