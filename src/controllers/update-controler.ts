import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userModel from "../models/user-model";

const updateControler = express.Router();

updateControler.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = new mongoose.Types.ObjectId(id);
  const { username, email, password } = req.body;

  // Verificar se o email está vazio
  if (!email || email.trim().length === 0) {
    return res.status(400).send("O email está vazio!");
  }

  // Verificar se o email é válido
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send("Formato de email inválido!");
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send("Usuário não existe!");
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser && existingUser._id !== userId) {
      return res.status(400).send("Este email ja está cadastrado!");
    }

    user.email = email;

    if (username) {
      user.username = username;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    return res.send("Dados Atualizados com sucesso");
  } catch (err) {
    console.log(err);
    return res.status(500).send(`Erro no servidor ${err}`);
  }
});

export default updateControler;
