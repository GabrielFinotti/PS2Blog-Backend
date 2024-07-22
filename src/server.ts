import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
export * from "colors";
import mongoConfig from "./db/mongoConfig";
// import firebaseConfig from "./db/firebaseConfig";
import { routers } from "./routers/routers";
import { gameListUpdate } from "./jobs/cron/gameListUpdate";
import { createGameListCache } from "./jobs/cron/cacheWrite";

dotenv.config({ path: "./src/env/.env" });
const app = express();

app.use(
  json(),
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.listen(process.env.PORT, async () => {
  try {
    console.log("PS2 Blog API activated ✅ ".green.bgBlack);

    await mongoConfig();

    app.use("/", routers.userRouter, routers.gameList);

    // await firebaseConfig();

    createGameListCache.start();
    gameListUpdate.start();
  } catch (error) {
    console.log(`Connection fail, error: ${error}`.red.bgBlack);
  }
});
