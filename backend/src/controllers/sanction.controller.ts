import { Request, Response } from "express";
import Loan, { LoanStatus } from "../models/Loan";

export const getAllPendingLoans = async (
    req: Request,
    res: Response
) => {
    try {
        const loans = await Loan.find({
            status: LoanStatus.PENDING,
        })
            .populate({
                path: "borrowerId",
                select:
                    "fullName pan monthlySalary employementType brePassed",
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: loans.length,
            loans,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch pending loans",
        });
    }
};

export const sanctionLoan = async (
    req: Request & { user?: any },
    res: Response
) => {
    try {
        const { id } = req.params;
        const { sanctionReason } = req.body;

        if (!sanctionReason) {
            return res.status(400).json({
                success: false,
                message: "Sanction reason is required",
            });
        }

        const loan = await Loan.findById(id);

        if (!loan) {
            return res.status(404).json({
                success: false,
                message: "Loan not found",
            });
        }

        if (loan.status !== LoanStatus.PENDING) {
            return res.status(400).json({
                success: false,
                message: `Loan is already ${loan.status}`,
            });
        }

        loan.status = LoanStatus.SANCTIONED;
        loan.sanctionedAt = new Date();

        if (sanctionReason) {
            loan.sanctionReason = sanctionReason;
        }

        await loan.save();

        return res.status(200).json({
            success: true,
            message: "Loan sanctioned successfully",
            loan,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to sanction loan",
        });
    }
};

export const rejectSanctionLoan = async (
    req: Request & { user?: any },
    res: Response
) => {
    try {
        const { id } = req.params;
        const { rejectionReason } = req.body;

        if (!rejectionReason) {
            return res.status(400).json({
                success: false,
                message: "Rejection reason is required",
            });
        }

        const loan = await Loan.findById(id);

        if (!loan) {
            return res.status(404).json({
                success: false,
                message: "Loan not found",
            });
        }

        if (loan.status !== LoanStatus.PENDING) {
            return res.status(400).json({
                success: false,
                message: `Loan is already ${loan.status}`,
            });
        }

        loan.status = LoanStatus.REJECTED;
        loan.rejectionReason = rejectionReason;

        await loan.save();

        return res.status(200).json({
            success: true,
            message: "Loan rejected successfully",
            loan,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to reject loan",
        });
    }
};