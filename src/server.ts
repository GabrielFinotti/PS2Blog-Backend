// Importações
import express from "express";
import connect from "../db/connect";
import userRouter from "./routes/user";
import scrapingCron from "./job/scrapingCron";
import gameListRouter from "./routes/gameList";

const app = express();
app.use(express.json());

scrapingCron.start();

connect;

app.use("/", userRouter, gameListRouter);

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000!");
});
