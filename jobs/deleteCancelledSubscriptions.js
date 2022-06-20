const db = require("../models");

var CronJob = require("cron").CronJob;
var job = new CronJob(
  "0 0 * * * *",
  async function () {
    const user = await db.User.findAll({
      where: {
        "$Subscription.cancelOn$": {
          [db.Sequelize.Op.gte]: Math.floor(new Date().getTime() / 1000),
        },
      },
      include: [db.Subscription],
    });

    for (let i = 0; i < user.length; i++) {
      await user[i].destroy({});
    }
  },
  null,
  true,
  "America/Toronto"
);

module.exports = job;
