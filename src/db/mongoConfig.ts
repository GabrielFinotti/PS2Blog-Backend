import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./src/env/.env" });

export default async () => {
  await mongoose
    .connect(process.env.DB_URL, { dbName: process.env.DB_NAME })
    .then(() => {
      console.log("Connected Database!".cyan);
    })
    .catch((error) => {
      console.log(`Error: ${error}`.red.bgBlack);
    });
};
