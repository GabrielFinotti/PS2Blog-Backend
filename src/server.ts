import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
export * from "colors";
import mongoConfig from "./db/mongoConfig";
import { routers } from "./routers/routers";

dotenv.config({ path: "./src/env/.env" });
const app = express();

app.use(
  json(),
  cors({
    origin: process.env.CLIENT_URL,
  })
);

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
