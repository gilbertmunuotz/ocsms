// *** Import Router & Controller Func *** //
import { Router } from "express";
import { verifyToken } from "../middlewares/jwtToken";
import { authorize } from "../middlewares/authorize";
import { createSellerProfile } from "../controllers/seller";

// **** Functions **** //
//Initiate Express Router
const router = Router();

router.post("/new", verifyToken, authorize("SELLER", "ADMIN"), createSellerProfile);

// **** Export default **** //
export default router;