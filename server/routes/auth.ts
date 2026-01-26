// *** Import Router & Controller Func *** //
import { Router } from "express";
import { Login } from "../validations/auth/login";
import { Register } from "../validations/auth/register";
import { register, login } from "../controllers/auth";

// **** Functions **** //
//Initiate Express Router
const router = Router();


/* Register Route */
router.post('/register', Register, register);


/* Login Route */
router.post('/login', Login, login);


// **** Export default **** //
export default router;