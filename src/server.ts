import { railwayDb } from "./../db/railwayConnect";
import express from "express";
import cors from "cors";
import { scrapingCron } from "./job/scrapingCron";
import { router } from "./routes/routers";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://ps2-blog-frontend.vercel.app/",
  })
);

scrapingCron.start();

railwayDb().then(() => {
  app.use("/", router.userRouter, router.gameListRouter);

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
  });
});
