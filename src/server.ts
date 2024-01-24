// Importações
import express from "express";
import connect from "../db/connect";
import userRouter from "./routes/userRouter";
import scrapingCron from "./job/scrapingCron";

const app = express();
app.use(express.json());

scrapingCron.start();

connect;

app.use("/", userRouter);

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000!");
});
