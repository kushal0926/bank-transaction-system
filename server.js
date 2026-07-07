import { config } from "dotenv";
config({ quiet: true });
import app from "./src/index.js";
import { connectDB, disconnectDB } from "./src/config/db.js";

const port = process.env.PORT;

connectDB();

const server = app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});

// handle unhandled promise rejection (e.g database connection error)
process.on("unhandledRejection", (err) => {
  console.error("unhandled rejection", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// handles uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("uncaught exception", err);
  await disconnectDB();
  process.exit(1);
});

// gracefull shutdown
process.on("SIGTERM", async () => {
  console.error("STGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});
