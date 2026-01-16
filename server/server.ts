// **** Import npm Packages **** //
import express, { NextFunction, Request, Response } from 'express';
import dotenv from "dotenv";
// Load env variables
dotenv.config();
import HttpStatusCodes from './constants/HttpStatusCodes';
import EnvVars from './constants/env';

// ****  Setup **** //

// Initiate Express
const app = express();

// **** Middlewares **** //

// Basic middleware
app.use(express.json());


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


// Listen to Server Response
const port = EnvVars.Port;
app.listen(port, () => {
  console.log(`Server Listening on Port ${port}`);
});

// **** Export app Instance **** //
export default app;