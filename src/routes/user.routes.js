import express from "express";
import {
  userLoginController,
  userRegisterController,
} from "../controller/user.controller.js";

const userRoutes = express.Router();

// POST /api/v1/auth/register
userRoutes.post("/register", userRegisterController);

// POST /api/v1/auth/login
userRoutes.post("/login", userLoginController);

export default userRoutes;
