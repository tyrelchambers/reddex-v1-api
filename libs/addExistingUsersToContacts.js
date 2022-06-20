const db = require("../models");
const addUserToSendGridContact = require("./addUserToSendGridContact");

(async () => {
  const users = await db.User.findAll();

  users.forEach((user) => {
    addUserToSendGridContact(user);
  });
})();
