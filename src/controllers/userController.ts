import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userModel from "../models/user-model";
import { UserData } from "../interfaces/user-data";

export const login = async (req: Request, res: Response) => {
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
};

export const register = async (req: Request, res: Response) => {
  try {
    const data = await readData(req.body);
    if (typeof data === "string") {
      return res.status(400).json({ message: data });
    }
    const existingEmail = await userModel.findOne({ email: data.email });
    if (existingEmail) {
      return res.status(409).json({ message: "Este email já existe!" });
    }
    const hashPassword = await bcrypt.hash(data.password, 10);
    const user = new userModel({
      username: data.username,
      email: data.email.toLowerCase(),
      password: hashPassword,
    });
    await user.save();
    res.status(201).json({ message: "Save criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: `Erro interno do servidor: ${err}` });
  }

  async function readData(datas: UserData) {
    if (datas.username === "" || datas.password === "" || datas.email === "") {
      return "Preencha todos os campos!";
    }
    if (
      datas.username != datas.username.trim() ||
      datas.password != datas.password.trim()
    ) {
      return "Os dados não podem começar com espaçamentos";
    }
    if (datas.username.length < 4 || datas.username.length > 16) {
      return "O nome de usuário deve ter entre 4 e 16 caracteres!";
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(datas.email)) {
      return "Insira um email válido!";
    }
    if (datas.password.length < 6 || datas.password.length > 20) {
      return "A senha deve ter entre 6 e 20 caracteres!";
    }
    const verifyData = datas;

    return verifyData;
  }
};

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
      return res.status(404).json({ message: "Save não encontrado!" });
    }
    const data = await readData(req.body);
    if (typeof data === "string") {
      return res.status(400).json({ message: data });
    }
    await updateData(data, userId);
    res.status(200).json({ message: "Save game atualizado!" });
  } catch (err) {
    res.status(500).json({ message: `Erro interno no servidor: ${err}` });
  }
  
  async function readData(datas: UserData) {
    if (datas.username === "" || datas.password === "" || datas.email === "") {
      return "Preencha todos os campos!";
    }
    if (
      (datas.username && datas.username != datas.username.trim()) ||
      (datas.password && datas.password != datas.password.trim())
    ) {
      return "Os dados não podem começar com espaçamentos";
    }
    if (datas.username) {
      if (datas.username.length < 4 || datas.username.length > 16) {
        return "O nome de usuário deve ter entre 4 e 16 caracteres!";
      }
    }
    if (datas.password) {
      if (datas.password.length < 6 || datas.password.length > 20) {
        return "A senha deve ter entre 6 e 20 caracteres!";
      }
    }
    if (datas.email) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(datas.email)) {
        return "Insira um email válido!";
      }
    }
    const verifyData = datas;

    return verifyData;
  }

  async function updateData(datas: UserData, id: mongoose.Types.ObjectId) {
    let updateData: Partial<UserData> = {};
    if (datas.username) updateData.username = datas.username;
    if (datas.email) updateData.email = datas.email.toLowerCase();
    if (datas.password) {
      const newPassword = await bcrypt.hash(datas.password, 10);
      updateData.password = newPassword;
    }
    await userModel.findByIdAndUpdate(id, { $set: updateData });
  }
};
