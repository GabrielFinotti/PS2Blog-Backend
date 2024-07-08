import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./src/env/.env" });

export default async () => {
  try {
    console.log("Establishing connection to the database ⚠️".yellow.bgBlack);

    await mongoose.connect(process.env.DB_URL, { dbName: process.env.DB_NAME });

    console.log("Connected Database!".cyan);
  } catch (error) {
    throw error;
  }
};
