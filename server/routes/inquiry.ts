import { Router } from "express";
import { verifyToken } from "../middlewares/jwtToken";
import { authorize } from "../middlewares/authorize";
import { createInquiry, getSellerInbox } from "../controllers/inquiry";

const router = Router();

// Buyer creates inquiry
router.post("/new", verifyToken, authorize("BUYER"), createInquiry);

// Seller Gets his/her inquiry
router.get("/inbox", verifyToken, authorize("SELLER"), getSellerInbox);

export default router;