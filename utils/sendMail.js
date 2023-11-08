const nodemailer = require('nodemailer');


async function sendForgotEmail(code, email) {
    console.log("ShortCode***", code)
    console.log("Email***", email)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.SENDERS_EMAIL,
          pass: process.env.SENDERS_PASSWORD
        }
    });

    const info = await transporter.sendMail({
        from: {
            name: 'Abstract Submission Web Application',
            address: process.env.SENDERS_EMAIL,
        }, // sender address
        to: email, // list of receivers
        subject: "Forgot password",
        text: "Your password reset code is: \n " + code + "\n please input it into the website and reset your password.",
        // html: "<b>Hello world?</b>", // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      return "Message sent: %s", info.messageId
}

async function sendWelcomeEmail (email) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.SENDERS_EMAIL,
          pass: process.env.SENDERS_PASSWORD
        }
    });

    const info = await transporter.sendMail({
        from: {
            name: 'Abstract Submission Web Application',
            address: process.env.SENDERS_EMAIL,
        }, // sender address
        to: email, // list of receivers
        subject: "Welcome to the Abstract Web Submission Platform", // Subject line
        text: "Thank you for registering on our platform! We are excited to have you with us.", // plain text body
        // html: "<b>Hello world?</b>", // html body
      });
    
      console.log("Message sent: %s", info.messageId);
}



module.exports = {sendWelcomeEmail, sendForgotEmail}
