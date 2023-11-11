import express from "express";
import dotenv from "dotenv";
import { sendingservice } from "../controllers/service.controller";

dotenv.config();

const router = express.Router();

router.post("/", sendingservice);

export default router;
