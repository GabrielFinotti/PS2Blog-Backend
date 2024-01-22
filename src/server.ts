import express, { Request, Response } from "express";
import registerControler from "./controllers/register-controler";
import loginControler from "./controllers/login-controler";
import updateControler from "./controllers/update-controler";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

mongoose
  .connect("mongodb://localhost:27017/PS2-Blog")
  .then(() => console.log("Conectado ao Banco"))
  .catch((err) => console.log(`Conexão com o banco falhou: ${err}`));

app.get("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).send("Express ativado");
});

app.use("/register", registerControler);
app.use("/login", loginControler);
app.use("/update", updateControler);

app.listen(port, () => {
  console.log("Servidor iniciado na porta 3000!");
});
