import mongoose, { Schema, Document } from "mongoose";

export interface IRepayment extends Document {
  loanId: mongoose.Types.ObjectId;

  utrNumber: string;
  amount: number;
  paymentDate: Date;

  createdBy: mongoose.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const repaymentSchema = new Schema<IRepayment>(
  {
    loanId: {
      type: Schema.Types.ObjectId,
      ref: "Loan",
      required: true,
      index: true,
    },

    utrNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    paymentDate: {
      type: Date,
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IRepayment>(
  "Repayment",
  repaymentSchema
);