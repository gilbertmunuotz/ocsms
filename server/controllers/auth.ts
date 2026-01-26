import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import prisma from "../services/prisma";
import { User, LoginBody } from "../constants/interfaces";
import { generateJwtToken } from "../utils/jwtToken";

//(DESC) Register User
export async function register(req: Request, res: Response, next: NextFunction) {

    // Destructre req.body
    const { name, email, password }: User = req.body;

    try {
        // Check if User Already Exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(HttpStatusCodes.CONFLICT).json({
                message: "User already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = newUser;

        return res.status(HttpStatusCodes.CREATED).json({
            message: "User created successfully",
            user: userWithoutPassword,
        });
    } catch (error) {
        next(error);
    }
}

//(DESC) Login User
export async function login(req: Request, res: Response, next: NextFunction) {

    // Destructre req.body
    const { email, password } = req.body as LoginBody;

    try {
        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({
                message: "Invalid email or password",
            });
        }

        // Compare passwords  
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({
                message: "Invalid email or password",
            });
        }

        // Generate JWT token
        const token = generateJwtToken(user.id, user.role);

        return res.status(HttpStatusCodes.OK).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
}