import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("database connected successfully..");
  } catch (error) {
    console.error("database failed to connect:", error);
    process.exit(1);
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log("database disconnected.");
  } catch (error) {
    console.error("failed to disconnect database:", error);
  }
}
