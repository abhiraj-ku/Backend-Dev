import nodemailer from "nodemailer";

// email sender utility function
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,

    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  const message = {
    from: "huskydon8@gmail.com",
    to: options.mail,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(message);
};

export default sendEmail;
