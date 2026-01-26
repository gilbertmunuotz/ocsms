// *** Import Router & Controller Func *** //
import { Router } from "express";
import { createVehicleCategory, getAllVehicleCategories } from "../controllers/vehicleCategory";
import { verifyToken } from '../middlewares/jwtToken';
import { authorize } from "../middlewares/authorize";

// **** Functions **** //
//Initiate Express Router
const router = Router();

//Create vehicle category
router.post("/new", verifyToken, authorize("ADMIN"), createVehicleCategory);

//Retrive All vehicle Category
router.get("/all", getAllVehicleCategories);


// **** Export default **** //
export default router;