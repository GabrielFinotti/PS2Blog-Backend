import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userModel from "../../models/user-model";
import { UserData } from "../../interfaces/user-data";

export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(406)
        .json({ message: "Id de usuário não correspondente!" });
    }

    const userId = new mongoose.Types.ObjectId(id);
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const data = await readData(req.body);

    if (typeof data === "string") {
      return res.status(400).json({ message: data });
    }

    await updateData(data, userId);
    res.status(200).json({ message: "Save atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: `Erro interno no servidor: ${err}` });
  }

  async function readData(userData: UserData) {
    const { username, password, email } = userData;

    if (!username && !password && !email) {
      return "Nenhum dado fornecido para atualização!";
    }

    if (
      (username && username !== username.trim()) ||
      (password && password !== password.trim())
    ) {
      return "Os dados não podem começar com espaçamentos";
    }

    if (username && (username.length < 4 || username.length > 16)) {
      return "O nome de usuário deve ter entre 4 e 16 caracteres!";
    }

    if (email) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!emailRegex.test(email)) {
        return "Insira um email válido!";
      }
    }

    if (password && (password.length < 6 || password.length > 20)) {
      return "A senha deve ter entre 6 e 20 caracteres!";
    }

    return userData;
  }

  async function updateData(userData: UserData, id: mongoose.Types.ObjectId) {
    let updateData: Partial<UserData> = {};

    if (userData.username) updateData.username = userData.username;
    if (userData.email) updateData.email = userData.email.toLowerCase();

    if (userData.password) {
      const newPassword = await bcrypt.hash(userData.password, 10);
      updateData.password = newPassword;
    }

    await userModel.findByIdAndUpdate(id, { $set: updateData });
  }
};
