import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();

export const generateJwtToken = (userId: number, role: string) => {
    // Ensure JWT_SECRET exists
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not defined");

    // Explicitly type options
    const options: SignOptions = {
        expiresIn: (process.env.JWT_TOKEN_EXPIRES ?? "7d") as never,
    };

    // Synchronous JWT sign
    return jwt.sign({ userId, role }, secret, options);
};