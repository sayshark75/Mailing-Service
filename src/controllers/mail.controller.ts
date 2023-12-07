import { Request, Response } from "express";
import dotenv from "dotenv";
import mailerService from "../services/mail.service";

// for access ENV Variables
dotenv.config();

// A controller to send mail
const MailController = {
  sendMail: async (req: Request, res: Response) => {
    // we request email, name and message from client
    const { email, name, message } = req.body;

    // Modify As per your needs, Put HTML, send to other persons
    // I was sending to myself, for my portfolio contact section

    // Verify if all the fields exists, you can do different validation logic.
    if (typeof email === "string" && typeof name === "string" && typeof message === "string") {
      // everything is ok, then send the mail
      // we will get response of mail status in "info"
      const info = await mailerService.sendMail(email, message, name);
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
  },
};

export default MailController;
