import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../../models/userModels";
import { UserData } from "../../interfaces/userDataInterface";

export const login = async (req: Request, res: Response) => {
  try {
    const userData: UserData = req.body;
    const user = await userModel.findOne(
      { email: userData.email },
      { password: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const validPassword: boolean = await bcrypt.compare(
      userData.password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({ message: "Senha incorreta!" });
    }

    res.status(200).json({ message: "Save carregado com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: `Erro interno do servidor ${err}` });
  }
};