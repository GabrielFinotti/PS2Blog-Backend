import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/user-model";
import { UserData } from "../interfaces/user-data";

const registerControler = express.Router();

registerControler.post("/", async (req: Request, res: Response) => {
  try {
    const data = await readData(req.body);
    if (typeof data === "string") {
      return res.status(400).json({ message: data });
    }
    const existingEmail = await userModel.findOne({ email: data.email });
    if (existingEmail) {
      return res.status(409).json({ message: "Este email ja existe!" });
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
});

async function readData(datas: UserData) {
  if (datas.username === "" || datas.password === "" || datas.email === "") {
    return "Preenche todos os campos!";
  }
  if (
    datas.username != datas.username.trim() ||
    datas.password != datas.password.trim()
  ) {
    return "Os dados não podem começar com espaçamentos";
  }
  if (datas.username.length < 4 || datas.username.length > 16) {
    return "O nome de usuário tem que ter entre 4 e 16 caracteres!";
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(datas.email)) {
    return "Insira um email válido!";
  }
  if (datas.password.length < 6 || datas.password.length > 20) {
    return "A senha tem que ter entre 6 e 20 caracteres!";
  }
  const verifyData = datas;

  return verifyData;
}

export default registerControler;
