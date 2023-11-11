import express from "express";
import { sendingservice } from "../controllers/service.controller";

// Simple Routing
const router = express.Router();

router.post("/", sendingservice);

export default router;
