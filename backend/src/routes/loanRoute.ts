import { Router } from "express";
import {upload} from "../config/multer"
import { applyForLoan, getMyLoans } from "../controllers/loan.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const loanRoute = Router();

loanRoute.post("/apply", authMiddleware, applyForLoan);
loanRoute.get("/my-loans", authMiddleware, getMyLoans);

export default loanRoute;