const { sendGridApiUrl, contactLists ***REMOVED*** = require("../constants"***REMOVED***
const addContactSendGrid = (email) => {
  axios.put(
    sendGridApiUrl + "/marketing/contacts",
    { list_ids: contactLists.users, contacts: [{ email ***REMOVED***] ***REMOVED***,
    {
      headers: {
        Authorization: "Bearer " + process.env.SENDGRID_API_KEY,
      ***REMOVED***,
    ***REMOVED***
  ***REMOVED***
***REMOVED***;

module.exports = addContactSendGrid;
