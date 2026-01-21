import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import prisma from "../services/prisma";

export async function createSellerProfile(req: Request, res: Response, next: NextFunction) {

    const { business_name, location } = req.body;
    const user = req.user!;

    try {
        // Check if already a seller
        const existingSeller = await prisma.seller.findUnique({
            where: { userId: user.id },
        });

        if (existingSeller) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                message: "Seller profile already exists",
            });
        }

        const seller = await prisma.seller.create({
            data: {
                userId: user.id,
                business_name,
                location,
            },
        });

        return res.status(HttpStatusCodes.CREATED).json({
            message: "Seller profile created successfully",
            seller,
        });
    } catch (error) {
        next(error);
    }
}