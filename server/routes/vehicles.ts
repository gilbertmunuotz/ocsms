// *** Import Router & Controller Func *** //
import { Router } from "express";
import { verifyToken } from '../middlewares/jwtToken';
import { authorize } from "../middlewares/authorize";
import { createVehicle, getVehicles, getVehicleById, deleteVehicle } from "../controllers/vehicles";

// **** Functions **** //
//Initiate Express Router
const router = Router();

//Create Vehicle
router.post("/new", verifyToken, authorize("SELLER", "ADMIN"), createVehicle);

//Read all vehicles
router.get("/all", verifyToken, getVehicles);

// Read single vehicle
router.get("/vehicle/:id", verifyToken, getVehicleById);

// Delete vehicle (SELLER owns it or ADMIN)
router.delete("/delete/:id", verifyToken, authorize("SELLER", "ADMIN"), deleteVehicle);

// **** Export default **** //
export default router;