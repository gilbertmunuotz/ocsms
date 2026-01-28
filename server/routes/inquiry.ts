import { Router } from "express";
import { verifyToken } from "../middlewares/jwtToken";
import { authorize } from "../middlewares/authorize";
import { createInquiry } from "../controllers/inquiry";

const router = Router();

// Buyer creates inquiry
router.post("/new", verifyToken, authorize("BUYER"), createInquiry);

export default router;
