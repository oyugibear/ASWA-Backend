const path = require("path")
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") })
const sgMail = require("@sendgrid/mail")

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

async function sendEmail(url, email) {
  console.log("URL***", url)
  const msg = {
    to: email,
    from: {
      email: "no-reply@fasinii.com",
      name: "Fasinii Rentals",
    },
    subject: "Email confirmation",
    templateId: "d-53c92fc8b2d84ee9a72331cf4637f259",
    personalizations: [
      {
        to: [{ email }],
        dynamic_template_data: {
          "url": `${url}`,
        },
      }
    ],
  }
  return await sgMail.send(msg)
}
async function sendForgotEmail(code, email) {
  console.log("ShortCode***", code)
  const msg = {
    to: email,
    from: {
      email: "no-reply@fasinii.com",
      name: "Fasinii Rentals",
    },
    subject: "Forgot password",
    templateId: "d-d2a468d7c94746d38c1c9d8946fe205f",
    personalizations: [
      {
        to: [{ email }],
        dynamic_template_data: {
          "code": `${code}`,
        },
      }
    ],
  }
  return await sgMail.send(msg)
}
module.exports = { sendEmail, sendForgotEmail }
