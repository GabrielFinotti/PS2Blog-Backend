// Importações
import express, { Request, Response } from "express";
import connect from "../db/connect";
import * as userController from "./modules/user-controller";

const app = express();
const port = process.env.PORT || 3000;
connect;

app.use(express.json())

app.use("/login", userController.loginControler);
app.use("/register", userController.registerControler);
app.use("/update", userController.updateControler);

app.get("/", (req: Request, res: Response) => {
  try {
    res.status(200).send("Servidor Online");
  } catch (err) {
    res.status(500).send("Erro interno no servidor");
  }
});
app.listen(port, () => {
  console.log("Servidor iniciado na porta 3000!");
});
