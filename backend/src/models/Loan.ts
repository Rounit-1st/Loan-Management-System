import mongoose, { Schema, Document } from "mongoose";

export enum LoanStatus {
  PENDING = "PENDING",
  SANCTIONED = "SANCTIONED",
  REJECTED = "REJECTED",
  DISBURSED = "DISBURSED",
  CLOSED = "CLOSED",
}

export interface ILoan extends Document {
  borrowerId: mongoose.Types.ObjectId;

  principalAmount: number;
  tenureDays: number;
  interestRate: number;

  simpleInterest: number;
  totalRepayment: number;

  status: LoanStatus;

  sanctionReason?: string;
  rejectionReason?: string;

  sanctionedAt?: Date;
  disbursedAt?: Date;
  closedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const loanSchema = new Schema<ILoan>(
  {
    borrowerId: {
      type: Schema.Types.ObjectId,
      ref: "Borrower",
      required: true,
      index: true,
    },

    principalAmount: {
      type: Number,
      required: true,
      min: 1,
    },

    tenureDays: {
      type: Number,
      required: true,
      min: 1,
    },

    interestRate: {
      type: Number,
      default: 12,
      required: true,
    },

    simpleInterest: {
      type: Number,
      required: true,
    },

    totalRepayment: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(LoanStatus),
      default: LoanStatus.PENDING,
    },

    sanctionReason: String,
    rejectionReason: String,

    sanctionedAt: Date,
    disbursedAt: Date,
    closedAt: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILoan>("Loan", loanSchema);