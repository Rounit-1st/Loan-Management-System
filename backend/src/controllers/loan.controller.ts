import { Request, Response } from "express";
import Loan, { LoanStatus } from "../models/Loan";
import { checkBussinessRules } from "../utils/BRE";
import { Borrower, User } from "../models/User";

export const applyForLoan = async (
    req: Request & { user?: any },
    res: Response
) => {
    try {
        const borrower = await Borrower.findOne({ userId: req.user.userId });

        if (!borrower) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const rulecheck =  checkBussinessRules(borrower.dob, Number(borrower.monthlySalary));

        if(rulecheck){
            return res.status(400).json(rulecheck);
        };

        const { principalAmount, tenureDays } = req.body;

        if (!principalAmount || !tenureDays) {
            return res.status(400).json({
                success: false,
                message: "Principal amount and tenure are required",
            });
        }

        const interestRate = 12;

        const simpleInterest =
            (principalAmount * interestRate * tenureDays) /
            (100 * 365);

        const totalRepayment =
            principalAmount + simpleInterest;

        const loan = await Loan.create({
            borrowerId: req.user.userId,
            principalAmount,
            tenureDays,
            interestRate,
            simpleInterest,
            totalRepayment,
            status: LoanStatus.PENDING,
        });

        return res.status(201).json({
            success: true,
            message: "Loan application submitted",
            loan,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to apply for loan",
        });
    }
};

export const getMyLoans = async (
    req: Request & { user?: any },
    res: Response
) => {
    try {
        const loans = await Loan.find({
            borrowerId: req.user.userId,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            loans,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch loans",
        });
    }
};