import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import { Role } from "../constants/interfaces";

export function authorize(...allowedRoles: Role[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({
                message: "Unauthorized",
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(HttpStatusCodes.FORBIDDEN).json({
                message: "Access denied",
            });
        }

        next();
    };
}