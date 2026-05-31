import { Router } from "express";
import  { showUserLeads} from "../controllers/sales.controller";
import { authorityAuth } from "../middleware/authAuthority";

const salesRoute = Router();

salesRoute.get("/leads", authorityAuth("SALES","ADMIN"), showUserLeads);

export default salesRoute;