import { Router } from "express";
import { authorityAuth } from "../middleware/authAuthority";
import { getAllDisbursedLoans, payLoan} from "../controllers/collection.controller";

const collectorsRoute = Router();

collectorsRoute.get("/pending", authorityAuth("COLLECTION","ADMIN"), getAllDisbursedLoans);
collectorsRoute.patch("/:id/payment", authorityAuth("COLLECTION","ADMIN"), payLoan);

export default collectorsRoute;