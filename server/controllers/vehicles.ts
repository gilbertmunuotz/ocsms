/* eslint-disable @typescript-eslint/no-unnecessary-type-conversion */
import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import prisma from "../services/prisma";
import { Vehicle } from "../constants/interfaces";


//(DESC) Create Vehicle
export async function createVehicle(req: Request, res: Response, next: NextFunction) {

    // Destructure Request Body
    const { categoryId, brand, model, year, price, mileage, fuel_type, transmission, condition, description, status }: Vehicle = req.body;

    // Normalize numeric fields
    const parsedCategoryId = Number(categoryId);
    const parsedYear = Number(year);
    const parsedPrice = Number(price);
    const parsedMileage = Number(mileage);

    if (Number.isNaN(parsedCategoryId)) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
            message: "categoryId must be a number",
        });
    }
    const user = req.user!;

    try {
        // 0. Validate image upload
        if (!req.file) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                message: "At least one vehicle image is required",
            });
        }

        // 1. Validate category exists
        const category = await prisma.vehicleCategory.findUnique({
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-conversion
            where: { id: Number(categoryId) },
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
                categoryId: parsedCategoryId,
                brand,
                model,
                year: parsedYear,
                price: parsedPrice,
                mileage: parsedMileage,
                fuel_type,
                transmission,
                condition,
                description,
                status,
            },
        });

        // 4. Create vehicle image
        const imageUrl = `/uploads/${req.file.filename}`;

        await prisma.vehicleImage.create({
            data: {
                vehicleId: vehicle.id,
                image_url: imageUrl,
            },
        });

        // 5. Fetch vehicle with images (clean response)
        const vehicleWithImages = await prisma.vehicle.findUnique({
            where: { id: vehicle.id },
            include: { images: true },
        });

        return res.status(HttpStatusCodes.CREATED).json({
            message: "Vehicle created successfully",
            vehicle: vehicleWithImages,
        });
    } catch (error) {
        next(error);
    }
}

//(DESC) Get All Vehicles
export async function getVehicles(req: Request, res: Response, next: NextFunction) {
    const user = req.user;

    try {
        let vehicles;

        if (user?.role === "SELLER") {
            // Sellers only see their own vehicles
            vehicles = await prisma.vehicle.findMany({
                where: { sellerId: user.id },
                include: { category: true, seller: true, images: true },
            });
        } else {
            // Admin or Buyer sees all vehicles
            vehicles = await prisma.vehicle.findMany({
                include: { category: true, seller: true, images: true },
            });
        }

        return res.status(HttpStatusCodes.OK).json({ vehicles });
    } catch (error) {
        next(error);
    }
}

// (DESC) Get vehicles for buyers (AVAILABLE only)
export async function getAvailableVehicles(req: Request, res: Response, next: NextFunction) {
    try {
        const vehicles = await prisma.vehicle.findMany({
            where: {
                status: "AVAILABLE",
            },
            include: {
                category: true,
                images: true,
            },
            orderBy: {
                date_posted: "desc",
            },
        });

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
            include: { category: true, seller: true, images: true },
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

//(DESC) Update vehicle (only seller or admin)
export async function updateVehicle(req: Request, res: Response, next: NextFunction) {
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

        // Authorization check
        if (user.role !== "ADMIN" && vehicle.sellerId !== user.id) {
            return res.status(HttpStatusCodes.FORBIDDEN).json({
                message: "You are not authorized to update this vehicle",
            });
        }

        const { description, price, brand, year, mileage, status, transmission, model, fuel_type, condition } = req.body;


        const updatedVehicle = await prisma.vehicle.update({
            where: { id: Number(id) },
            data: {
                description,
                price,
                brand,
                year,
                mileage,
                status,
                transmission,
                model,
                fuel_type,
                condition,
            },
        });

        return res.status(HttpStatusCodes.OK).json({
            message: "Vehicle updated successfully",
            vehicle: updatedVehicle,
        });
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