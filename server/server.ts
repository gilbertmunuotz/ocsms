// **** Import npm Packages **** //
import express, { NextFunction, Request, Response } from 'express';
import dotenv from "dotenv";
// Load env variables
dotenv.config();
import { USERS_URL } from './constants/constant';
import cors from "cors";
import HttpStatusCodes from './constants/HttpStatusCodes';
import EnvVars from './constants/env';
import AuthRoutes from './routes/auth';
import VehicleCategoryRoutes from "./routes/vehicleCategory";
import VehicleRoutes from './routes/vehicles';
import SellerRoutes from "./routes/seller";
import AdminRoutes from "./routes/admin";
import InquiryRoutes from "./routes/inquiry";

import path from 'path';

// ****  Setup **** //

// Initiate Express
const app = express();

// **** Middlewares **** //

// Basic middleware
app.use(express.json());
app.use(cors({
  origin: `${USERS_URL}`,
  credentials: true,
}));

//Test Sample Route
app.get('/api', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send('Welcome Back To ocsms Backend!');
  } catch (error) {
    console.error('Error Getting Signal', error);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({ status: 'error', message: 'Internal Server Error' });
    next(error);
  }
});


//Define Routes Here
app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/vehicleCategory', VehicleCategoryRoutes);
app.use('/api/v1/vehicle', VehicleRoutes);
app.use('/api/v1/seller', SellerRoutes);
app.use('/api/v1/users', AdminRoutes);
app.use("/api/v1/inquiry", InquiryRoutes);


// Serve static files from uploads directory
// app.use("/uploads", express.static("uploads"));
app.use(
  "/uploads",
  express.static(path.resolve(process.cwd(), "uploads"))
);
// Listen to Server Response
const port = EnvVars.Port;
app.listen(port, () => {
  console.log(`Server Listening on Port ${port}`);
});

// **** Export app Instance **** //
export default app;