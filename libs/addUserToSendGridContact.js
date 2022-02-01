const { default: axios } = require("axios");
const { sendGridApiUrl } = require("../constants");

const sendGridKey = process.env.SENDGRID_API_KEY;

const addUserToSendGridContact = (user) => {
  axios
    .put(
      `${sendGridApiUrl}/marketing/contacts`,
      {
        contacts: [
          {
            email: user.email,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${sendGridKey}`,
        },
      }
    )
    .then((res) => console.log(res));
};

module.exports = addUserToSendGridContact;
