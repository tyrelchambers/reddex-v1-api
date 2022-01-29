const stripeData = require("../constants/stripeData"***REMOVED***
const db = require("../models"***REMOVED***
const stripe = require("./stripe"***REMOVED***

(async () => {
  const users = await db.User.findAll(***REMOVED***

  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    setTimeout(async () => {
      const customer = await stripe.customers.create({
        email: user.email,
      ***REMOVED******REMOVED***
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        coupon: stripeData.coupons.free6MonthsPro,
        items: [
          {
            price: stripeData.products.pro.year,
          ***REMOVED***,
        ],
      ***REMOVED******REMOVED***
      await db.Subscription.create({
        userId: user.uuid,
        customerId: customer.id,
        subscriptionId: subscription.id,
      ***REMOVED******REMOVED***
    ***REMOVED***, index * 1000***REMOVED***
  ***REMOVED***
***REMOVED***)(***REMOVED***
