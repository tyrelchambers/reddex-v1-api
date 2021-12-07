const { emailTemplates ***REMOVED*** = require("../constants"***REMOVED***
const sgMail = require("@sendgrid/mail"***REMOVED***

sgMail.setApiKey(process.env.SENDGRID_API_KEY***REMOVED***

const sendEmail = (data) => {
  const msg = {
    to: data.email, // Change to your recipient
    from: "services@reddex.app", // Change to your verified sender
    subject: data.subject,
    templateId: emailTemplates.confirmEmail,
    dynamic_template_data: {
      redirect_url: process.env.FRONT_END,
      token: data.token,
    ***REMOVED***,
  ***REMOVED***;

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent"***REMOVED***
    ***REMOVED***)
    .catch((error) => {
      console.error(error***REMOVED***
    ***REMOVED******REMOVED***
***REMOVED***;

module.exports = sendEmail;
