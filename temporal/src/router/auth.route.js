import { Router } from "express";
import { login, verifyOtp } from "../controller/auth.controller.js";

const route = Router();

route.post("/login", login);
route.post("/verify-otp", verifyOtp);


export default route;
