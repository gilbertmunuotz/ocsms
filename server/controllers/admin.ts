import { Request, Response, NextFunction } from "express";
import prisma from "../services/prisma";
import HttpStatusCodes from "../constants/HttpStatusCodes";

// (DESC) Get all users
export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
            },
        });

        return res.status(HttpStatusCodes.OK).json(users);
    } catch (error) {
        next(error);
    }
}

// (DESC) Get single user
export async function getUserById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });

        if (!user) {
            return res.status(HttpStatusCodes.NOT_FOUND).json({
                message: "User not found",
            });
        }

        return res.status(HttpStatusCodes.OK).json(user);
    } catch (error) {
        next(error);
    }
}

// (DESC Update user role
export async function updateUserRole(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { role } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });

        if (!user) {
            return res.status(HttpStatusCodes.NOT_FOUND).json({
                message: "User not found",
            });
        }

        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: { role },
        });

        return res.status(HttpStatusCodes.OK).json({
            message: "User role updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        next(error);
    }
}

// (DESC Delete user
export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });

        if (!user) {
            return res.status(HttpStatusCodes.NOT_FOUND).json({
                message: "User not found",
            });
        }

        await prisma.user.delete({
            where: { id: Number(id) },
        });

        return res.status(HttpStatusCodes.OK).json({
            message: "User deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}