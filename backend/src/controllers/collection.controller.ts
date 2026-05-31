import { Request, Response } from "express";
import Loan, { LoanStatus } from "../models/Loan";
import { Borrower } from "../models/User";
import Repayment from "../models/Repayment";

export const getAllDisbursedLoans = async (
    req: Request,
    res: Response
) => {
    try {
        const loans = await Loan.find({
            status: LoanStatus.DISBURSED,
        }).sort({ disbursedAt: -1 });

        const enrichedLoans = await Promise.all(
            loans.map(async (loan) => {
                const borrower = await Borrower.findOne({
                    userId: loan.borrowerId,
                }).populate("userId", "email role");

                return {
                    ...loan.toObject(),
                    borrowerProfile: borrower,
                };
            })
        );

        return res.status(200).json({
            success: true,
            count: enrichedLoans.length,
            loans: enrichedLoans,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch disbursed loans",
        });
    }
};

export const payLoan = async (
    req: Request & { user?: any },
    res: Response
) => {
    try {
        const { id } = req.params;

        const {
            utrNumber,
            amount,
            paymentDate,
        } = req.body;

        const loan = await Loan.findById(id);

        if (!loan) {
            return res.status(404).json({
                success: false,
                message: "Loan not found",
            });
        }

        if (loan.status !== LoanStatus.DISBURSED) {
            return res.status(400).json({
                success: false,
                message:
                    "Payments can only be recorded for disbursed loans",
            });
        }

        const repayment = await Repayment.create({
            loanId: loan._id,
            utrNumber,
            amount,
            paymentDate,
            createdBy: req.user.userId,
        });

        const repayments = await Repayment.find({
            loanId: loan._id,
        });

        const totalPaid = repayments.reduce(
            (sum, repayment) => sum + repayment.amount,
            0
        );

        const outstandingAmount =
            loan.totalRepayment - totalPaid;

        if (outstandingAmount <= 0) {
            loan.status = LoanStatus.CLOSED;
            loan.closedAt = new Date();

            await loan.save();
        }

        return res.status(201).json({
            success: true,
            repayment,
            totalPaid,
            outstandingAmount:
                outstandingAmount > 0
                    ? outstandingAmount
                    : 0,
            loanStatus: loan.status,
        });
    } catch (error: any) {
        console.error(error);

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "UTR already exists",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to record payment",
        });
    }
};