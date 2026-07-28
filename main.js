import { config } from "dotenv";
config({ quiet: true });
import { connectDB, disconnectDB } from "./src/config/db.js";
import createServer from "./src/index.js";

const port = process.env.PORT ?? 8081;

async function main() {
  try {
    await connectDB();

    const server = createServer().listen(port, () => {
      console.log(`server is running on port http://localhost:${port}`);
    });

    // handle unhandled promise rejection (e.g database connection error)
    process.on("unhandledRejection", (err) => {
      console.error("unhandled rejection", err);
      server.close(() => {
        disconnectDB().finally(() => process.exit(1));
      });
    });

    // handles uncaught exceptions
    process.on("uncaughtException", (err) => {
      console.error("uncaught exception", err);
      server.close(() => {
        disconnectDB().finally(() => process.exit(1));
      });
    });

    // graceful shutdown
    process.on("SIGTERM", () => {
      console.log("SIGTERM received, shutting down gracefully");
      server.close(() => {
        disconnectDB().finally(() => process.exit(0));
      });
    });

    // optional: handle Ctrl+C locally the same way as SIGTERM
    process.on("SIGINT", () => {
      console.log("SIGINT received, shutting down gracefully");
      server.close(() => {
        disconnectDB().finally(() => process.exit(0));
      });
    });
  } catch (err) {
    console.error("failed to start server", err);
    process.exit(1);
  }
}

main();
