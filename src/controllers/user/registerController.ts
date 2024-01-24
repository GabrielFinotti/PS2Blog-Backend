import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../../models/user";
import { validateUserData } from "../../utils/userValidation";

export const register = async (req: Request, res: Response) => {
  try {
    const data = await validateUserData(req.body);

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
};
