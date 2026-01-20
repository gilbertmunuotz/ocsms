import jwt from 'jsonwebtoken';
import process from "process";
import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from '../constants/HttpStatusCodes';
import { JwtPayload } from "../constants/interfaces";

// Middleware to verify JWT token
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization; // Extract token from Authorization header

    if (!authHeader) {
        res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: "Unauthorized! No token provided" }); // Return to stop execution
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        // Attach authenticated user to request
        req.user = {
            id: decoded.id,
            role: decoded.role,
        };

        next();
    } catch (error) {
        res.status(HttpStatusCodes.FORBIDDEN).json({
            message: "Invalid or expired token",
        });
    }
};