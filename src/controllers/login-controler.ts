import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/user-model";
import { UserData } from "../interfaces/user-data";

const loginControler = express.Router();

loginControler.post("/", async (req: Request, res: Response) => {
  try {
    const data: UserData = req.body;
    const user = await userModel.findOne(
      { email: data.email },
      { password: true }
    );
    if (!user) {
      return res.status(404).json({ message: "Save não encontrado!" });
    }
    const validPassword: Boolean = await bcrypt.compare(
      data.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).json({ message: "Senha incorreta!" });
    }
    res.status(200).json({ message: "Save carregado com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: `Erro interno do servidor ${err}` });
  }
});

export default loginControler;
