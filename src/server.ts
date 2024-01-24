// Importações
import express from "express";
import connect from "../db/connect";
import scrapingCron from "./job/scrapingCron";
import { router } from "./routes/routers";

const app = express();
app.use(express.json());

scrapingCron.start();

connect;

app.use("/", router.userRouter, router.gameListRouter);

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000!");
});
