import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../../models/user";
import { validateUserData } from "../../utils/userValidation";

export const register = async (req: Request, res: Response) => {
  try {
    const userData = await validateUserData(req.body);

    if (typeof userData === "string") {
      return res.status(400).json({ message: userData });
    }

    const existingEmail = await userModel.findOne({ email: userData.email });

    if (existingEmail) {
      return res.status(409).json({ message: "Este email já está em uso!" });
    }

    const hashPassword = await bcrypt.hash(userData.password, 10);
    const user = new userModel({
      username: userData.username,
      email: userData.email.toLowerCase(),
      password: hashPassword,
    });

    await user.save();
    res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: `Erro interno do servidor: ${err}` });
  }
};
