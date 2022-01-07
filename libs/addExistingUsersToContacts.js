const db = require("../models"***REMOVED***
const addUserToSendGridContact = require("./addUserToSendGridContact"***REMOVED***

(async () => {
  const users = await db.User.findAll(***REMOVED***

  users.forEach((user) => {
    addUserToSendGridContact(user***REMOVED***
  ***REMOVED******REMOVED***
***REMOVED***)(***REMOVED***
