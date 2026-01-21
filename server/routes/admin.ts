// *** Import Router & Controller Func *** //
import { Router } from "express";
import { authorize } from "../middlewares/authorize";
import { verifyToken } from "../middlewares/jwtToken";
import { getAllUsers, getUserById, updateUserRole, deleteUser } from "../controllers/admin";

// **** Functions **** //
//Initiate Express Router
const router = Router();

// Apply Middleware to All Routes as They’re admin-only routes
router.use(verifyToken, authorize("ADMIN"));

router.get("/all", getAllUsers);

router.get("/user/:id", getUserById);

router.put("/user/:id/role", updateUserRole);

router.delete("/user/:id", deleteUser);

// **** Export default **** //
export default router;