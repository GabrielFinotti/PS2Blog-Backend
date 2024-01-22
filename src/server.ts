// Importações
import express, { Request, Response } from "express";
import connect from "../db/connect";
import * as userController from "./modules/user-controller";

// Execução do express e banco
const app = express();
const port = process.env.PORT || 3000;
connect;

// Permitindo recebimento de dados json
app.use(express.json())

// Controladores de Usuários
app.use("/login", userController.loginControler);
app.use("/register", userController.registerControler);
app.use("/update", userController.updateControler);

// Configuração da porta e verificação do estatos do servidor
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
