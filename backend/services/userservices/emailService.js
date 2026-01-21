const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text, html }) => {
  // Setup transporter (Gmail example, replace with your SMTP)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  });

  return { msg: 'Email sent successfully' };
};

module.exports = sendEmail;
