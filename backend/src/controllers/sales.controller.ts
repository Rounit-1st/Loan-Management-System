import { Request, Response } from "express";
import {Borrower} from "../models/User";

export const showUserLeads = async (
    req: Request,
    res: Response
) => {
    try {
        const leads = await Borrower.find()
            .populate("userId", "email role")
            .select("-salarySlip");

        return res.status(200).json({
            success: true,
            count: leads.length,
            leads,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch leads",
        });
    }
};