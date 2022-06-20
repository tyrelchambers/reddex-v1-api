const { emailTemplates } = require("../constants");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (data) => {
  const msg = {
    to: data.to, // Change to your recipient
    from: "services@reddex.app", // Change to your verified sender
    subject: data.subject,
    templateId: data.template,
    dynamic_template_data: {
      ...data.dynamics,
    },
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendEmail;
