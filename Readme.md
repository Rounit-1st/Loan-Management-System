# 🏦 LoanFlow - Loan Management System

> Enterprise-grade Loan Management System built with Next.js, Express.js, TypeScript, and MongoDB.

A role-based lending platform that enables borrowers to apply for loans and allows internal operations teams to manage the complete loan lifecycle from application to closure.

---

# 📚 Table of Contents

* Overview
* Features
* System Architecture
* Technology Stack
* User Roles
* Loan Lifecycle
* Borrower Journey
* Business Rule Engine (BRE)
* Operations Dashboard
* Authentication & Authorization
* Project Structure
* Database Design
* API Design
* Setup & Installation
* Environment Variables
* Seed Accounts
* Future Improvements

---

# 🎯 Overview

FinLend is a modern Loan Management System designed to simulate real-world lending operations.

The platform consists of two major systems:

### Borrower Portal

Allows users to:

* Register
* Complete profile information
* Upload salary documents
* Configure loan requests
* Submit loan applications
* Track loan status

### Operations Dashboard

Allows internal teams to:

* Track leads
* Review applications
* Approve or reject loans
* Disburse funds
* Record repayments
* Automatically close fully repaid loans

---

# ✨ Core Features

### Borrower Features

* Secure Authentication
* Multi-Step Loan Application
* Salary Slip Upload
* Live Interest Calculation
* Loan Tracking
* Status Monitoring

### Executive Features

* Role-Based Dashboard
* Lead Management
* Loan Sanction Workflow
* Loan Disbursement Workflow
* Collection Management
* Payment Tracking

### Technical Features

* JWT Authentication
* Role-Based Access Control
* File Upload Validation
* Business Rule Engine
* Audit-Friendly Status Tracking
* Automated Loan Closure

---

# 🏗️ System Architecture

Borrower Portal
↓
Application Submission
↓
Business Rule Engine
↓
Loan Creation
↓
Sanction Team Review
↓
Disbursement Team
↓
Collection Team
↓
Loan Closure

---

# 🎬 Demo Video

[![Watch the video](https://img.youtube.com/vi/bDroPs2eZIg/maxresdefault.jpg)](https://youtu.be/bDroPs2eZIg)

---

# 🛠️ Technology Stack

## Frontend

* Next.js 15 (App Router)
* TypeScript
* Tailwind CSS

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT
* bcrypt
* Multer

---

# 👥 User Roles

| Role         | Permissions             |
| ------------ | ----------------------- |
| ADMIN        | Full Access             |
| SALES        | Lead Management         |
| SANCTION     | Loan Approval/Rejection |
| DISBURSEMENT | Fund Release            |
| COLLECTION   | Payment Collection      |
| BORROWER     | Loan Application        |

---

# 🔄 Loan Lifecycle

REGISTERED
↓
APPLIED
↓
SANCTIONED
↓
DISBURSED
↓
CLOSED

Alternative Path:

APPLIED
↓
REJECTED

---

# 📝 Borrower Journey

## Step 1 — Authentication

Users can:

* Register
* Login

Passwords are securely hashed using bcrypt.

---

## Step 2 — Personal Details

Required Information:

* Full Name
* PAN Number
* Date of Birth
* Monthly Salary
* Employment Mode

---

## Step 3 — Salary Slip Upload

Supported Formats:

* PDF
* JPG
* PNG

Maximum File Size:

5 MB

---

## Step 4 — Loan Configuration

Loan Amount:

₹50,000 – ₹5,00,000

Loan Tenure:

30 – 365 Days

Interest Rate:

12% per annum

Simple Interest Formula:

SI = (P × R × T) / (365 × 100)

Total Repayment:

Principal + Interest

---

# 🧠 Business Rule Engine (BRE)

Loan application is rejected if:

### Age Rule

Age < 23

OR

Age > 50

### Salary Rule

Monthly Salary < ₹25,000

### PAN Rule

Invalid PAN Format

Regex:

^[A-Z]{5}[0-9]{4}[A-Z]$

### Employment Rule

Employment Status = UNEMPLOYED

BRE validation runs on the server before loan creation.

---

# 🖥️ Operations Dashboard

## Sales Module

Purpose:

Track registered users who have not yet applied for loans.

Actions:

* View Leads

---

## Sanction Module

Purpose:

Review submitted applications.

Actions:

* Approve Loan
* Reject Loan

Status Changes:

APPLIED → SANCTIONED

APPLIED → REJECTED

---

## Disbursement Module

Purpose:

Release approved funds.

Actions:

* Mark Loan As Disbursed

Status Changes:

SANCTIONED → DISBURSED

---

## Collection Module

Purpose:

Manage repayments.

Actions:

* Record Payment
* Track Outstanding Balance

Status Changes:

DISBURSED → CLOSED
---

# 🔐 Authentication & Authorization

Authentication:

* JWT Access Tokens
* Protected Routes
* Password Hashing with bcrypt

Authorization:

* Role-Based Access Control (RBAC)
* Frontend Route Protection
* Backend Middleware Validation

Unauthorized API access returns:

403 Forbidden

---

# 🗄️ Database Design

Collections:

### Users

Stores:

* Authentication Data
* Role Information

### Borrower Profiles

Stores:

* Personal Information
* Employment Details
* Salary Slip Information

### Loans

Stores:

* Loan Details
* Loan Status
* Approval Information
* Disbursement Information

### Payments

Stores:

* UTR Number
* Payment Amount
* Payment Date

---

# 📡 API Modules

## Authentication

/api/auth

## Borrower

/api/profile

/api/loans

## Sales

/api/sales

## Sanction

/api/sanction

## Disbursement

/api/disbursement

## Collection

/api/collection

---

# 📁 Project Structure

```text
loan-management-system/
│
├── 📦 backend/
│   │
│   ├── 📂 src/
│   │   ├── 📂 config/          # Database & environment configuration
│   │   ├── 📂 controllers/     # Route handlers
│   │   ├── 📂 middleware/      # Auth, RBAC, validation
│   │   ├── 📂 models/          # Mongoose schemas
│   │   ├── 📂 routes/          # API routes
│   │   ├── 📂 services/        # Business logic
│   │   ├── 📂 utils/           # Helper functions
│   │   ├── 📂 validators/      # Zod / request validation
│   │   ├── 📂 seed/            # Seed scripts
│   │   └── 📄 server.ts
│   │
│   ├── 📂 uploads/             # Salary slips
│   ├── 📄 package.json
│   ├── 📄 tsconfig.json
│   └── 📄 .env
│
├── 🎨 frontend/
│   │
│   ├── 📂 app/                 # Next.js App Router
│   │   ├── 📂 login/
│   │   ├── 📂 register/
│   │   ├── 📂 dashboard/
│   │   └── 📂 apply/
│   │
│   ├── 📂 components/          # Shared UI components
│   ├── 📂 hooks/               # Custom React hooks
│   ├── 📂 services/            # API clients
│   ├── 📂 lib/                 # Utilities & configs
│   ├── 📂 types/               # TypeScript types
│   │         
│   ├── 📄 next.config.ts
│   ├── 📄 tsconfig.json
│   └── 📄 package.json
│
├── 📄 README.md
└── 📄 .gitignore
```

---

# 🚀 Setup

Backend:

```bash
npm install
npm run dev
```

Frontend:

```bash
npm install
npm run dev
```

---

# 🔧 Environment Variables

Backend:

```env
PORT=8000

MONGODB_URI=

JWT_SECRET=

FRONTEND_URL=
```

Frontend:

```env
NEXT_PUBLIC_BACKEND_URL=
```

---

# 👨‍💻 Executive Seed Credentials

## 🔑 Demo Credentials

> Pre-seeded accounts are available for quick testing of each role and workflow.

| Role                          | Email                    | Password          | Access                 |
| ----------------------------- | ------------------------ | ----------------- | ---------------------- |
| 👑 **Admin**                  | `admin@gmail.com`        | `admin123`        | Full System Access     |
| 📈 **Sales Executive**        | `sales@gmail.com`        | `sales123`        | Lead Management        |
| ✅ **Sanction Executive**      | `sanction@gmail.com`     | `sanction123`     | Approve / Reject Loans |
| 💸 **Disbursement Executive** | `disbursement@gmail.com` | `disbursement123` | Release Loan Funds     |
| 📦 **Collection Executive**   | `collection@gmail.com`   | `collection123`   | Record Repayments      |


### Role Access Matrix

| Module          | Admin | Sales | Sanction | Disbursement | Collection | Borrower |
| --------------- | :---: | :---: | :------: | :----------: | :--------: | :------: |
| Dashboard       |   ✅   |   ✅   |     ✅    |       ✅      |      ✅     |     ❌    |
| Lead Management |   ✅   |   ✅   |     ❌    |       ❌      |      ❌     |     ❌    |
| Loan Approval   |   ✅   |   ❌   |     ✅    |       ❌      |      ❌     |     ❌    |
| Disbursement    |   ✅   |   ❌   |     ❌    |       ✅      |      ❌     |     ❌    |
| Collections     |   ✅   |   ❌   |     ❌    |       ❌      |      ✅     |     ❌    |
| Apply Loan      |   ❌   |   ❌   |     ❌    |       ❌      |      ❌     |     ✅    |
| My Loans        |   ❌   |   ❌   |     ❌    |       ❌      |      ❌     |     ✅    |

> ⚠️ These accounts are intended for development and evaluation purposes only.


---

# 🔮 Future Improvements

* Credit Score Integration
* EMI-Based Loans
* Email Notifications
* SMS Notifications
* Loan Analytics Dashboard
* Audit Logs
* Document Verification Service
* Multi-Tenant Architecture

---

Built with ❤️ using Next.js, Express.js, TypeScript, and MongoDB.
