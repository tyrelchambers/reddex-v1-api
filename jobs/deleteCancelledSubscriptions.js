const db = require("../models"***REMOVED***

var CronJob = require("cron").CronJob;
var job = new CronJob(
  "* * * * * *",
  async function () {
    const user = await db.User.findAll({
      where: {
        "$Subscription.cancelOn$": {
          [db.Sequelize.Op.gte]: Math.floor(new Date().getTime() / 1000),
        ***REMOVED***,
      ***REMOVED***,
      include: [db.Subscription],
    ***REMOVED******REMOVED***

    for (let i = 0; i < user.length; i++) {
      await user[i].destroy({***REMOVED******REMOVED***
    ***REMOVED***
  ***REMOVED***,
  null,
  true,
  "America/Toronto"
***REMOVED***

module.exports = job;
