const db = require("../models"***REMOVED***
const stripe = require("./stripe"***REMOVED***

(async () => {
  const users = await db.User.findAll(***REMOVED***

  users.forEach(async (user) => {
    const customer = await stripe.customers.create({
      email: user.email,
    ***REMOVED******REMOVED***

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      coupon: "5BlDslIS",
      items: [
        {
          price: "price_1K64chI8C7KcVoSyUj7qgv65",
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
