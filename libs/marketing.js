const { default: axios } = require("axios");

// sendgrid
const contacts_url = "https://api.sendgrid.com/v3/marketing/contacts";

const addContact = (data) => {
  return axios
    .put(contacts_url, data, {
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });
};

module.exports = addContact;
