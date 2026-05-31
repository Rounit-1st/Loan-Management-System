import { Router } from "express";
import { authorityAuth } from "../middleware/authAuthority";
import { getAllPendingLoans, sanctionLoan, rejectSanctionLoan } from "../controllers/sanction.controller";

const sanctionRoute = Router();

sanctionRoute.get("/pending", authorityAuth("SANCTION","ADMIN"), getAllPendingLoans);
sanctionRoute.patch("/:id/approve", authorityAuth("SANCTION","ADMIN"), sanctionLoan);
sanctionRoute.patch("/:id/reject", authorityAuth("SANCTION","ADMIN"), rejectSanctionLoan);

export default sanctionRoute;