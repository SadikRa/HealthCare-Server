import nodemailer from "nodemailer";
import config from "../../../config";

const emailSender = async (email: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: config.email,
      pass: config.app_pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"PH HEALTH CARE" <sadikrahman494@gmail.com>',
    to: email,
    subject: "REset pass link",
    // text: "Hello world?",
    html,
  });

  console.log("Message sent: %s", info.messageId);
};

export default emailSender;
