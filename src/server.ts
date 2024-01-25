// Importações
import express from "express";
import connect from "../db/connect";
import cors from "cors";
import { scrapingCron } from "./job/scrapingCron";
import { router } from "./routes/routers";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

scrapingCron.start();

connect;

app.use("/", router.userRouter, router.gameListRouter);

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000!");
});
