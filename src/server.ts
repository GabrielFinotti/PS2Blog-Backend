import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Express ativado");
});

app.listen(port, () => {
  console.log("Servidor iniciado na porta 3000!");
});
