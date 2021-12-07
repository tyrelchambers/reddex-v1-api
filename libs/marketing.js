const { default: axios ***REMOVED*** = require("axios"***REMOVED***

// sendgrid
const contacts_url = "https://api.sendgrid.com/v3/marketing/contacts";

const addContact = (data) => {
  return axios
    .put(contacts_url, data, {
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY***REMOVED***`,
        "Content-Type": "application/json",
      ***REMOVED***,
    ***REMOVED***)
    .then((res) => {
      return res.data;
    ***REMOVED******REMOVED***
***REMOVED***;

module.exports = addContact;
