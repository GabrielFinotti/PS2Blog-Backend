import express, { json } from "express";
import dotenv from "dotenv";
import mongoConfig from "./db/mongoConfig";
import cors from "cors";
import { routers } from "./routers/routers";
export * from "colors";

dotenv.config({ path: "./src/env/.env" });
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(json());

app.listen(process.env.PORT, () => {
  console.log("PS2 Blog API activated ✅ ".green.bgBlack);
});

mongoConfig()
  .then(() => {
    app.use("/", routers.userRouter, routers.gameList);
  })
  .catch((error) => {
    console.log(`Connection fail, error: ${error}`.red.bgBlack);
  });
