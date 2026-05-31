import dotenv from 'dotenv';
dotenv.config({
  path: ".env"
});

import express from 'express';
import {connectToDatabase} from './config/db';
import authRoute from "./routes/authRoute"
import profileRoute from "./routes/profileRoute"
import loanRoute from './routes/loanRoute';
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from 'multer';
import path from 'path';

const app = express();
const port = 8000;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(
    "/uploads",
    express.static(path.join(__dirname, "../uploads"))
);
app.use(cookieParser());
app.use(express.json());
connectToDatabase();

app.get('/', (req, res) => {
     res.status(418).send(")I AM A TEAPOT");
});
app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);
app.use("/api/loans", loanRoute);


app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});