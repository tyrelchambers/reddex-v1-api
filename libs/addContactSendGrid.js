const { sendGridApiUrl, contactLists } = require("../constants");
const addContactSendGrid = (email) => {
  axios.put(
    sendGridApiUrl + "/marketing/contacts",
    { list_ids: contactLists.users, contacts: [{ email }] },
    {
      headers: {
        Authorization: "Bearer " + process.env.SENDGRID_API_KEY,
      },
    }
  );
};

module.exports = addContactSendGrid;
