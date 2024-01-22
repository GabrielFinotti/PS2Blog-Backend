import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/user-model";
import { UserData } from "../interfaces/user-data";

const loginControler = express.Router();

loginControler.post("/", async (req: Request, res: Response) => {
  try {
    // Recebendo os dados
    const data: UserData = req.body;

    // Verificando se o email existe no banco de dados
    const user = await userModel.findOne(
      { email: data.email },
      { password: true }
    );
    if (!user) {
      return res.status(400).json({ message: "Save não encontrado!" });
    }

    // Verificando se a senha enviada é igual a sua hash
    const validPassword: Boolean = await bcrypt.compare(
      data.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ message: "Senha incorreta!" });
    }
    res.status(200).json({ message: "Save carregado com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: `Erro interno do servidor ${err}` });
  }
});

export default loginControler;
