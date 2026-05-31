import { Router } from "express";
import {upload} from "../config/multer"
import  { createBorrowerProfile, uploadSalarySlip, getProfile } from "../controllers/profile.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const ProfileRoute = Router();

ProfileRoute.post("/upload-salary-slip", authMiddleware, upload.single("salarySlip") ,uploadSalarySlip);
ProfileRoute.post("/", authMiddleware, createBorrowerProfile);
ProfileRoute.get("/", authMiddleware, getProfile);

export default ProfileRoute;