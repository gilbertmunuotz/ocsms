// *** Import Router & Controller Func *** //
import { Router } from "express";
import { verifyToken } from '../middlewares/jwtToken';
import { authorize } from "../middlewares/authorize";
import { createVehicle, getVehicles, getVehicleById, deleteVehicle, updateVehicle, getAvailableVehicles } from "../controllers/vehicles";

// **** Functions **** //
//Initiate Express Router
const router = Router();

//Create Vehicle
router.post("/new", verifyToken, authorize("SELLER", "ADMIN"), createVehicle);

//Read all vehicles
router.get("/all", getVehicles);

// Read Buyer vehicle listing 
router.get("/", getAvailableVehicles);


// Read single vehicle
// router.get("/vehicle/:id", verifyToken, getVehicleById);
router.get("/vehicle/:id", getVehicleById);

// Update Vehicle Information
router.put("/update/:id", verifyToken, authorize("SELLER", "ADMIN"), updateVehicle);

// Delete vehicle (SELLER owns it or ADMIN)
router.delete("/delete/:id", verifyToken, authorize("SELLER", "ADMIN"), deleteVehicle);

// **** Export default **** //
export default router;