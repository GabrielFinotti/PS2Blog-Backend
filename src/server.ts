import express from "express";
import cors from "cors";
import { connect } from "./../db/connect";
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

connect().then(() => {
  app.use("/", router.userRouter, router.gameListRouter);

  const port = 3000;

  app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
  });
});
