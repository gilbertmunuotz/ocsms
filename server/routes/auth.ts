// *** Import Router & Controller Func *** //
import { Router } from "express";
import { LoginMiddleware } from "../middlewares/auth/login";
import { RegisterMiddleware } from "../middlewares/auth/register";
import { register, login } from "../controllers/auth";

// **** Functions **** //
//Initiate Express Router
const router = Router();


/* Register Route */
router.post('/register', RegisterMiddleware, register);


/* Login Route */
router.post('/login', LoginMiddleware, login);


// **** Export default **** //
export default router;