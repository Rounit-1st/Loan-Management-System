import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authorityAuth = (...allowedRoles: string[]) => {
    return (
        req: Request & { user?: any },
        res: Response,
        next: NextFunction
    ) => {
        const token = req.cookies["LMS-token"];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET!
            ) as {
                userId: string;
                role: string;
            };

            req.user = decoded;

            if (
                allowedRoles.length > 0 &&
                !allowedRoles.includes(decoded.role)
            ) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied",
                    userType: decoded.role,
                });
            }

            next();
        } catch {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }
    };
};