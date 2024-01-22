import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/user-model";

const registerControler = express.Router();

registerControler.post("/", async (req: Request, res: Response) => {
  try {
    if (
      req.body.username.trim() === "" ||
      req.body.email.trim() === "" ||
      req.body.password.trim() === ""
    ) {
      return res.status(400).send("Preencha todos os campos.");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).send("E-mail inválido.");
    }
    if (req.body.username.length < 4 || req.body.username.length > 16) {
      return res
        .status(400)
        .send("O nome de usuário deve ter entre 4 e 16 caracteres.");
    }
    if (req.body.password.length < 6 || req.body.password.length > 20) {
      return res.status(400).send("A senha deve ter entre 6 e 20 caracteres.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send("Usuário criado com sucesso!");
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});

export default registerControler;
