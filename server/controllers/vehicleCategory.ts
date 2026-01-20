// controllers/vehicleCategory.ts
import { Request, Response, NextFunction } from "express";
import prisma from "../services/prisma";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import { CreateVehicleCategory } from "../constants/interfaces";

// (DESC) Create a Vehicle Category
export async function createVehicleCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const { category_name }: CreateVehicleCategory = req.body;

        // Check if category already exists
        const existing = await prisma.vehicleCategory.findUnique({
            where: { category_name },
        });

        if (existing) {
            return res.status(HttpStatusCodes.CONFLICT).json({
                message: `Category '${category_name}' already exists`,
            });
        }

        const category = await prisma.vehicleCategory.create({
            data: {
                category_name,
            },
        });

        return res.status(HttpStatusCodes.CREATED).json({
            message: "Vehicle category created successfully",
            category,
        });
    } catch (error) {
        next(error);
    }
}

// (DESC) Get all Vehicle Categories
export async function getAllVehicleCategories(req: Request, res: Response, next: NextFunction) {
    try {
        const categories = await prisma.vehicleCategory.findMany();
        return res.status(HttpStatusCodes.OK).json({ categories });
    } catch (error) {
        next(error);
    }
}