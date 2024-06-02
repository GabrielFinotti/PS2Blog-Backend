import express, { json } from "express";
import dotenv from "dotenv";
import config from "./db/config";
export * from "colors";

dotenv.config({ path: "./src/env/.env" });
const app = express();

app.use(json());

app.listen(process.env.PORT, () => {
  console.log("active");
});

config();
