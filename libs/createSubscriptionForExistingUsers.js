const stripeData = require("../constants/stripeData");
const db = require("../models");
const stripe = require("./stripe");

(async () => {
  const users = await db.User.findAll();

  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    setTimeout(async () => {
      const customer = await stripe.customers.create({
        email: user.email,
      });
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        coupon: stripeData.coupons.free6MonthsPro,
        items: [
          {
            price: stripeData.products.pro.year,
          },
        ],
      });
      await db.Subscription.create({
        userId: user.uuid,
        customerId: customer.id,
        subscriptionId: subscription.id,
      });
    }, index * 1000);
  }
})();
