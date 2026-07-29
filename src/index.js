import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";

function createServer() {
  const server = express();

  server.use(express.json());
  server.use(cookieParser());

  // routes
  server.use("/api/v1/auth", userRoutes);

  return server;
}

export default createServer;
