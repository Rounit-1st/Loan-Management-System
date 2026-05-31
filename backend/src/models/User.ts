import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [
            "ADMIN",
            "SALES",
            "SANCTION",
            "DISBURSEMENT",
            "COLLECTION",
            "BORROWER"
        ],
        required: true
    }
});

const BorrowerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    fullName: {
        type: String,
        required: true
    },

    pan: {
        type: String,
        required: true,
        uppercase: true,
        match: [
            /^[A-Z]{5}[0-9]{4}[A-Z]$/,
            "Invalid PAN format"
        ]
    },

    dob: {
        type: Date,
        required: true
    },

    monthlySalary: {
        type: Number,
        required: true
    },

    employementType: {
        type: String,
        enum: ["Salaried", "Self-Employed"],
        required: true
    },

    salarySlip: {
        type: Buffer,
        contentType: String,
        // required: true,
    },

    brePassed: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema) //remember the product name should start with captital letter and must be singular so mongo internall does convert objects into products
const Borrower = mongoose.model('Borrower', BorrowerSchema)

export {User, Borrower};