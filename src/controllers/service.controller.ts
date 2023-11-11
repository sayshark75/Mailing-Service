import { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const sendingservice = async (req: Request, res: Response) => {
  const { email, name, message } = req.body;
  const date = new Date();

  // Modify As per your needs, Put HTML, send to other persons
  // I was sending to myself, for my portfolio contact section

  if (email && name && message) {
    const info = await transporter.sendMail({
      from: `"${process.env.USER}" <${process.env.APP_EMAIL}>`,
      to: `${process.env.APP_EMAIL}`,
      subject: `Message From: ${name}`,
      text: `User ${name}, having emails as ${email},\n Says: ${message} :\n Date:${
        date.toLocaleTimeString() + " - " + date.toLocaleDateString()
      }`,
      html: "",
    });
    if (info.accepted.length > 0) {
      return res.send({ msg: "Mail Send Successfully", status: true });
    }
    if (info.rejected.length > 0) {
      return res.send({ msg: "Unable to Send Mail", status: false });
    }
  } else {
    res.send({
      msg: "Required Fields not present",
      status: false,
    });
  }
};

export { sendingservice };
