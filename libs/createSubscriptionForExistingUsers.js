const db = require("../models"***REMOVED***
const stripe = require("./stripe"***REMOVED***

(async () => {
  const users = await db.User.findAll(***REMOVED***

  users.forEach(async (user) => {
    const customer = await stripe.customers.create({
      email: user.email,
    ***REMOVED******REMOVED***

    await db.Subscription.create({
      userId: user.uuid,
      customerId: customer.id,
    ***REMOVED******REMOVED***

    await stripe.subscriptions.create({
      customer: customer.id,
      coupon: "5BlDslIS",
      items: [
        {
          price: "price_1K64chI8C7KcVoSyUj7qgv65",
        ***REMOVED***,
      ],
    ***REMOVED******REMOVED***
  ***REMOVED******REMOVED***
***REMOVED***)(***REMOVED***
