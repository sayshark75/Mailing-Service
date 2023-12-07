import express from "express";
import MailController from "../controllers/mail.controller";

// Simple Routing
const router = express.Router();

router.post("/", MailController.sendMail);

export default router;
