import express from "express";
import { userRegisterController } from "../controller/user.controller.js";

const userRoutes = express.Router();

userRoutes.post("/register", userRegisterController);

export default userRoutes;
