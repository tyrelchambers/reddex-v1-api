const { default: axios ***REMOVED*** = require("axios"***REMOVED***
const { sendGridApiUrl ***REMOVED*** = require("../constants"***REMOVED***

const sendGridKey = process.env.SENDGRID_API_KEY;

const addUserToSendGridContact = (user) => {
  axios
    .put(
      `${sendGridApiUrl***REMOVED***/marketing/contacts`,
      {
        contacts: [
          {
            email: user.email,
          ***REMOVED***,
        ],
      ***REMOVED***,
      {
        headers: {
          Authorization: `Bearer ${sendGridKey***REMOVED***`,
        ***REMOVED***,
      ***REMOVED***
    )
    .then((res) => console.log(res)***REMOVED***
***REMOVED***;

module.exports = addUserToSendGridContact;
