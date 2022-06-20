const emailTemplates = {
  confirmEmail: "d-55c4381673074d1e8fbe7a2056dd1f24",
  storySubmission: "d-b43fbb7b96a54f9ab164620ff62c6346",
  passwordChange: "d-d9efed684ca64571aa5ef8285e071cf9",
  emailChange: "d-2d0d3269b4da4e8089492b71db474dca",
  trialEnding: "d-cdf6cd0dd3a64c779c53ee0ddb6aabe9",
  forgotPassword: "d-7f17a906dceb4c7188f63d303e385e12",
};

const contactLists = {
  users: "696f0fc7-fba0-4cfb-ae64-753dc7318772",
};

const sendGridApiUrl = "https://api.sendgrid.com/v3";

module.exports = {
  emailTemplates,
  sendGridApiUrl,
  contactLists,
};
