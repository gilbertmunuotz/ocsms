import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import prisma from "../services/prisma";
import { Vehicle } from "../constants/interfaces";

//(DESC) Create Vehicle
export async function createVehicle(req: Request, res: Response, next: NextFunction) {

    // Destructure Request Body
    const { categoryId, brand, model, year, price, mileage, fuel_type, transmission, condition, description, status }: Vehicle = req.body;

    const user = req.user!;

    try {

        // 1. Validate category exists
        const category = await prisma.vehicleCategory.findUnique({
            where: { id: categoryId },
        });

        if (!category) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                message: "Invalid vehicle category",
            });
        }

        // 2. Determine sellerId
        const sellerId = user.role === 'ADMIN' ? req.body.sellerId ?? user.id : user.id;

        const seller = await prisma.seller.findUnique({
            where: { userId: sellerId },
        });

        if (!seller) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                message: "Seller profile not found. Create seller profile first.",
            });
        }

        // 3. Create Vehicle
        const vehicle = await prisma.vehicle.create({
            data: {
                sellerId,
                categoryId,
                brand,
                model,
                year,
                price,
                mileage,
                fuel_type,
                transmission,
                condition,
                description,
                status,
            },
        });

        return res.status(HttpStatusCodes.CREATED).json({
            message: "Vehicle created successfully",
            vehicle,
        });
    } catch (error) {
        next(error);
    }
}

//(DESC) Get All Vehicles
export async function getVehicles(req: Request, res: Response, next: NextFunction) {
    const user = req.user!;

    try {
        let vehicles;

        if (user.role === "SELLER") {
            // Sellers only see their own vehicles
            vehicles = await prisma.vehicle.findMany({
                where: { sellerId: user.id },
                include: { category: true, seller: true },
            });
        } else {
            // Admin or Buyer sees all vehicles
            vehicles = await prisma.vehicle.findMany({
                include: { category: true, seller: true },
            });
        }

        return res.status(HttpStatusCodes.OK).json({ vehicles });
    } catch (error) {
        next(error);
    }
}

//(DESC) Get single vehicle by ID
export async function getVehicleById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
        const vehicle = await prisma.vehicle.findUnique({
            where: { id: Number(id) },
            include: { category: true, seller: true },
        });

        if (!vehicle) {
            return res.status(HttpStatusCodes.NOT_FOUND).json({
                message: "Vehicle not found",
            });
        }

        return res.status(HttpStatusCodes.OK).json({ vehicle });
    } catch (error) {
        next(error);
    }
}

//(DESC) Delete vehicle (only Seller or Admin)
export async function deleteVehicle(req: Request, res: Response, next: NextFunction) {
    const user = req.user!;
    const { id } = req.params;

    try {
        const vehicle = await prisma.vehicle.findUnique({
            where: { id: Number(id) },
        });

        if (!vehicle) {
            return res.status(HttpStatusCodes.NOT_FOUND).json({
                message: "Vehicle not found",
            });
        }

        // Authorization: Only Admin or owning Seller can delete
        if (user.role !== "ADMIN" && vehicle.sellerId !== user.id) {
            return res.status(HttpStatusCodes.FORBIDDEN).json({
                message: "You are not authorized to delete this vehicle",
            });
        }

        await prisma.vehicle.delete({
            where: { id: Number(id) },
        });

        return res.status(HttpStatusCodes.OK).json({
            message: "Vehicle deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}