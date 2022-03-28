const nodemailer = require("nodemailer");
  // create reusable transporter object using the default SMTP transport
 module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "b72b23d1b89fbd", // generated ethereal user
      pass: "b6b34940f41807", // generated ethereal password
    },
  })
