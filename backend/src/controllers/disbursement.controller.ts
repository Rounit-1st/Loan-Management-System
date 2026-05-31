import { Request, Response } from "express";
import Loan, { LoanStatus } from "../models/Loan";

export const getAllUndisbursedLoans = async (
    req: Request,
    res: Response
) => {
    try {
        const loans = await Loan.find({
            status: LoanStatus.SANCTIONED,
        })
            .populate({
                path: "borrowerId",
                select:
                    "fullName pan monthlySalary employementType",
            })
            .sort({ sanctionedAt: -1 });

        return res.status(200).json({
            success: true,
            count: loans.length,
            loans,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch undisbursed loans",
        });
    }
};

export const disburseLoan = async (
    req: Request & { user?: any },
    res: Response
) => {
    try {
        const { id } = req.params;

        const loan = await Loan.findById(id);

        if (!loan) {
            return res.status(404).json({
                success: false,
                message: "Loan not found",
            });
        }

        if (loan.status !== LoanStatus.SANCTIONED) {
            return res.status(400).json({
                success: false,
                message: `Cannot disburse a ${loan.status} loan`,
            });
        }

        loan.status = LoanStatus.DISBURSED;
        loan.disbursedAt = new Date();

        await loan.save();

        return res.status(200).json({
            success: true,
            message: "Loan disbursed successfully",
            loan,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to disburse loan",
        });
    }
};