import nodemailer from "nodemailer";
import getCurrentDateInTimeZone from "./date.service";

// create and configure a nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // Generate this credentials from google account, in env file
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const mailerService = {
  sendMail: async (email: string, message: string, name: string) => {
    const info = await transporter.sendMail({
      // from your email or any other persons email, format must same.
      from: `"${process.env.USER}" <${process.env.APP_EMAIL}>`,
      // to the user email
      to: `${process.env.APP_EMAIL}`,
      // subject line
      subject: `Message From: ${name}`,
      // Whatever text you want to send,
      text: `User ${name}, having email as ${email},\n Says: ${message} :\n Date:${getCurrentDateInTimeZone("Asia/Kolkata")}`,
      // Whatever HTML you want to send
      html: "",
    });
    return info;
  },
};

export default mailerService;
