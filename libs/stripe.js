require("dotenv").config(***REMOVED***

const stripe = require("stripe")(process.env.STRIPE_KEY***REMOVED***

module.exports = stripe;
