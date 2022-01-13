const stripeData = require("../constants/stripeData"***REMOVED***
const db = require("../models"***REMOVED***

(async () => {
  const users = await db.User.findAll(***REMOVED***

  users.forEach(async (user) => {
    const customer = await stripe.customers.create({
      email: user.email,
    ***REMOVED******REMOVED***

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      coupon: stripeData.coupons.freeYearPro,
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
  ***REMOVED******REMOVED***
***REMOVED***)(***REMOVED***
