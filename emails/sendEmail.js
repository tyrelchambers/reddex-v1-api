const { emailTemplates ***REMOVED*** = require("../constants"***REMOVED***
const sgMail = require("@sendgrid/mail"***REMOVED***

sgMail.setApiKey(process.env.SENDGRID_API_KEY***REMOVED***

const sendEmail = (data) => {
  const msg = {
    to: data.to, // Change to your recipient
    from: "services@reddex.app", // Change to your verified sender
    subject: data.subject,
    templateId: data.template,
    dynamic_template_data: {
      ...data.dynamics,
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
