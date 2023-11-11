import { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// for access ENV Variables
dotenv.config();

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

// A controller to send mail
const sendingservice = async (req: Request, res: Response) => {
  // we request email, name and message from client
  const { email, name, message } = req.body;
  // new Date Instance
  const date = new Date();

  // Modify As per your needs, Put HTML, send to other persons
  // I was sending to myself, for my portfolio contact section

  // Verify if all the fields exists, you can do different validation logic.
  if (email && name && message) {
    // everything is ok, then send the mail
    // we will get response of mail status in "info"
    const info = await transporter.sendMail({
      // from your email or any other persons email, format must same.
      from: `"${process.env.USER}" <${process.env.APP_EMAIL}>`,
      // to the user email
      to: `${process.env.APP_EMAIL}`,
      // subject line
      subject: `Message From: ${name}`,
      // Whatever text you want to send,
      text: `User ${name}, having email as ${email},\n Says: ${message} :\n Date:${
        date.toLocaleTimeString() + " - " + date.toLocaleDateString()
      }`,
      // Whatever HTML you want to send
      html: "",
    });
    // info contains arrays as "accepted" & "rejected"
    if (info.accepted.length > 0) {
      return res.send({ msg: "Mail Send Successfully", status: true });
    }
    if (info.rejected.length > 0) {
      return res.send({ msg: "Unable to Send Mail", status: false });
    }
  } else {
    // some property values missing
    res.send({
      msg: "Required Fields not present",
      status: false,
    });
  }
};

export { sendingservice };
