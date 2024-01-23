import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../../models/user-model";
import { UserData } from "../../interfaces/user-data";

export const register = async (req: Request, res: Response) => {
  try {
    const data = await readData(req.body);

    if (typeof data === "string") {
      return res.status(400).json({ message: data });
    }

    const existingEmail = await userModel.findOne({ email: data.email });

    if (existingEmail) {
      return res.status(409).json({ message: "Este email já está em uso!" });
    }

    const hashPassword = await bcrypt.hash(data.password, 10);
    const user = new userModel({
      username: data.username,
      email: data.email.toLowerCase(),
      password: hashPassword,
    });

    await user.save();
    res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: `Erro interno do servidor: ${err}` });
  }

  async function readData(userData: UserData) {
    const { username, password, email } = userData;

    if (!username || !password || !email) {
      return "Preencha todos os campos!";
    }

    if (username !== username.trim() || password !== password.trim()) {
      return "Os dados não podem começar com espaçamentos";
    }

    if (username.length < 4 || username.length > 16) {
      return "O nome de usuário deve ter entre 4 e 16 caracteres!";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return "Insira um email válido!";
    }

    if (password.length < 6 || password.length > 20) {
      return "A senha deve ter entre 6 e 20 caracteres!";
    }

    return userData;
  }
};
