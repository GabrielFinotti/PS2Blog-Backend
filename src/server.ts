// Importações
import express from "express";
import connect from "../db/connect";
import routes from "./routes/userRouter";
import scrapingCron from "./job/scraping-cron";

const app = express();
app.use(express.json());

scrapingCron.start();

connect;

app.use("/", routes);

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000!");
});
