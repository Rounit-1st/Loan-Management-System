import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET!;
// console.log("JWT_SECRET:", JWT_SECRET);

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            passwordHash,
            role,
        });

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
            },
            JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        return res.status(201).json({
            success: true,
            token,
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Registration failed",
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
            },
            JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.cookie("LMS-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user,
        });

    } catch (error) {
        console.log("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Login failed",
            error
        });
    }
};

export const logout = async (req: Request, res: Response) => {
    res.clearCookie("token");

    return res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};

export const me = async (req: any, res: Response) => {
    try {
        const user = await User.findById(req.user.userId).select(
            "-passwordHash"
        );

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch profile",
        });
    }
};