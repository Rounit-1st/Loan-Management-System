import { Response } from "express";
import { Borrower } from "../models/User";
import { checkBussinessRules } from "../utils/BRE";

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

export const createBorrowerProfile = async (
    req: any,
    res: Response
) => {
    try {

        const existing = await Borrower.findOne({
            userId: req.user.userId
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Borrower profile already exists"
            });
        }

        const {
            fullName,
            pan,
            dob,
            monthlySalary,
            employementType
        } = req.body;

        const normalizedPan = pan.toUpperCase();
        if (!panRegex.test(normalizedPan)) {
            return res.status(400).json({
                success: false,
                message: "Invalid PAN number",
            });
        }

        const borrower = await Borrower.create({
            userId: req.user.userId,
            fullName,
            pan:normalizedPan,
            dob,
            monthlySalary,
            employementType,
        });

        return res.status(201).json({
            success: true,
            borrower,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create borrower profile",
        });
    }
};

export const uploadSalarySlip = async (req: any, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const borrower = await Borrower.findOne({ userId: req.user.userId });

        if (!borrower) {
            return res.status(404).json({
                success: false,
                message: "Borrower profile not found",
            });
        }

        borrower.salarySlip = req.file.buffer;
        await borrower.save();

        return res.status(200).json({
            success: true,
            message: "Salary slip uploaded successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to upload salary slip",
        });
    }
};

export const getProfile = async (
    req: any,
    res: Response
) => {
    try {
        const borrower = await Borrower.findOne({
            userId: req.user.userId,
        });

        if (!borrower) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }

        return res.status(200).json({
            success: true,
            borrower,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch profile",
        });
    }
};