import { Router } from "express";
import { authorityAuth } from "../middleware/authAuthority";
import { getAllUndisbursedLoans, disburseLoan } from "../controllers/disbursement.controller";

const disbursementRoute = Router();

disbursementRoute.get("/pending", authorityAuth("DISBURSEMENT","ADMIN"), getAllUndisbursedLoans);
disbursementRoute.patch("/:id/disburse", authorityAuth("DISBURSEMENT","ADMIN"), disburseLoan);

export default disbursementRoute;